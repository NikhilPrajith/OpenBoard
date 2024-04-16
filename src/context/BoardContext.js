import {create} from 'zustand';
import { createClient } from '@liveblocks/client';
import { liveblocks } from '@liveblocks/zustand';
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import ReactFlow, { MiniMap, Controls,Background, useNodesState, useEdgesState, addEdge,ReactFlowProvider, 
  applyEdgeChanges,
  applyNodeChanges,
  ConnectionLineType,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
} from 'reactflow';
import useStore from './store';
import useAuth from './Authentication/AuthProvider';
import { auth, db } from '@/firebase/firebase.config';

import { AiOutlineExclamationCircle } from 'react-icons/ai';


import { collection,addDoc,setDoc,doc, userDocRef, arrayUnion,updateDoc, getDoc,deleteDoc } from "@firebase/firestore";


import { Upload, Modal, Input, Button, notification, ColorPicker, message } from 'antd';

//Old Approach with context


const BoardContext = createContext();
export const useBoard = () => useContext(BoardContext);
export const BoardProvider = ({ children }) => {

  const themes = {
    'Paper': {
      images: ['https://media2.giphy.com/media/UGsxPNSbdY8dmvK3sv/giphy.webp?cid=790b7611d58zfm3p7yllqe6afpjqbsj3i1fycf55k2gr7wem&ep=v1_stickers_search&rid=giphy.webp&ct=s',
      "https://media1.giphy.com/media/V4EJ4p9HtRpqnTwumB/giphy.webp?cid=790b7611g5ve87m0xbtlp8h67vd7zsdwytoxzd1dntv1m3aw&ep=v1_stickers_search&rid=giphy.webp&ct=s",
        ],
      textColor:'black',
      backgroundColor: 'rgb(249, 249, 249)',
      effect: 'stary'
    },
      'Plain': {
          images: ['https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXV2YTVjYmo2bDl6YnF2ejVzcG54aWx2bHdmb3oxMDBkemtqZmQxeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/l8vIGjX9hGEKeuciyY/giphy.gif',
            ],
          textColor:'black',
          backgroundColor: '#fff',
          effect: ''
        },
        'Bubbles': {
          images: ['https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWs3eHF0dXBidnZkMnZ6NGRhMjg2dGQyY2E1ZWpjdm5qN3pocG11YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/amsQ2HhLt07c494Hsa/200.webp',
            "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTN2eTZlenJhYm85c21udTV2dWhpcHBycHV0eXZwZ2FuaGgxOWdwOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/zCchp1hZEdRsaoMO7k/giphy.gif",
            'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXJoc29hbzZyMHVkMng2ejEzdGgwMjAycTExODJub3VsOWltY3NkciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/RMBeZ1ABjDQOaiPLzj/giphy.gif',
            'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3k4cTRjd3BvbmVrajU5eDlsdW1waXE1YTczMzJyMDYwd3J1dGlpbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/tZDwexxUn05JKajRVe/giphy.gif',
            'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTN2eTZlenJhYm85c21udTV2dWhpcHBycHV0eXZwZ2FuaGgxOWdwOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/zCchp1hZEdRsaoMO7k/giphy.gif',
            'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXJoc29hbzZyMHVkMng2ejEzdGgwMjAycTExODJub3VsOWltY3NkciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/RMBeZ1ABjDQOaiPLzj/giphy.gif',
  
        ],
          textColor:'black',
          backgroundColor: '#f0f0f0',
          effect: 'bubbles'
        },
      'Night': {
        images: ['https://media4.giphy.com/media/YNk9HRcH9zJfi/giphy.webp?cid=790b7611x39lwhezcnx7y1edq82ow6ur7g2ejxkvip2co8rv&ep=v1_gifs_search&rid=giphy.webp&ct=g',
            "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTJsYWhxd2dybXMxbDZvbTh0M3VkaWlod3BkejBhMWYwajUwYmo1ZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/uk4Va5MkRp2bfkOk6f/giphy.webp",
            'https://media3.giphy.com/media/ycCpm8r5MAZCtxMcw3/giphy.webp?cid=790b76113teq6wiceutcr1nquu4ue2y05broolzuihmx2ssd&ep=v1_gifs_search&rid=giphy.webp&ct=g',
            'https://media4.giphy.com/media/wMQTobBKTpmg5TLuZ5/giphy.webp?cid=790b7611jexhhk8s356nk6zhxplhnciny3ds5uuk84gehd97&ep=v1_stickers_search&rid=giphy.webp&ct=s',
            'https://media2.giphy.com/media/l3E6IlIx5f9nVjd84/giphy.webp?cid=790b76118reiqvb7vm2e7rzqx4ts5lcfjxcx4hmyumfedaiq&ep=v1_gifs_search&rid=giphy.webp&ct=g',
            'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2c3OGY0eGZ5NnVkbnh2YTUzZTF4anQ0MnRjeTIzZG9ydzZtaGpuaiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/SvL3OShXgy790ThNjo/200.webp',
  
      ],
        textColor:'white',
        backgroundColor: 'color(srgb 0.1349 0.1546 0.2544)',
        effect: 'stary'
      },
      'Snowy': {
          images: ['https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWwwcXhyZWhseXB3MGkydnJkYTl3dXRtNWE1cW5qYW5teG1zOHpycCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FL4IWDUYp0y6kTK/giphy.gif',
            'https://media2.giphy.com/media/fkfHjUMBVKrUo5Z3F3/200.webp?cid=790b7611nt4lc1wr8rro02qk5erb4ic4sge1pv9k47oh9goi&ep=v1_gifs_search&rid=200.webp&ct=g',
            'https://media1.giphy.com/media/6YNgoTEPs6vZe/200.webp?cid=790b7611nt4lc1wr8rro02qk5erb4ic4sge1pv9k47oh9goi&ep=v1_gifs_search&rid=200.webp&ct=g',
            'https://media2.giphy.com/media/vtyEwptbP3aR7LwLpt/giphy.webp?cid=790b7611syio0m1m3dearc3e9hfrbvl9i3vja8kvawl1ktpx&ep=v1_stickers_search&rid=giphy.webp&ct=s',
            'https://media2.giphy.com/media/vtyEwptbP3aR7LwLpt/giphy.webp?cid=790b7611syio0m1m3dearc3e9hfrbvl9i3vja8kvawl1ktpx&ep=v1_stickers_search&rid=giphy.webp&ct=s',
            'https://media2.giphy.com/media/6OZeZhQOHd6hb6GxFm/giphy.webp?cid=790b7611syio0m1m3dearc3e9hfrbvl9i3vja8kvawl1ktpx&ep=v1_stickers_search&rid=giphy.webp&ct=s',
            'https://media2.giphy.com/media/y98bVYNM1q41CKgjVZ/giphy.webp?cid=790b7611h2os4gkrcba4h97zia5rsry0bt04p1zkroms7gz9&ep=v1_stickers_search&rid=giphy.webp&ct=s',
            'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2VqaHQwdHFmY2QxbHkzb3ByM252Zm5uNWp6ZGFtNjB6dTR3eGxhNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/OmoKW1gK6ULg4/giphy.webp',
  
      ],
          textColor:'white',
          backgroundColor: 'rgb(197, 232, 250)',
          effect: 'snow'
      },
      'Party': {
          images: ['https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWNsa29lYTZzYnB4dWlrMmNjdnV2ajEwanl0ZHBxeDkzNG5jd3B3dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/StKiS6x698JAl9d6cx/giphy.gif',
        'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2xpOXowZHowYzExbjhhOG13b2FwZzllaGdwa2V2NWM1enF2ZmRsYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/StKiS6x698JAl9d6cx/giphy.webp',
        'https://media0.giphy.com/media/zrBtooZpywQgDdQZJL/giphy.webp?cid=790b7611htjhq1j636cxosa6twqgvrmte8cvpxmyal768bts&ep=v1_stickers_search&rid=giphy.webp&ct=s',
        'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGxkYW91OW80dzh6MGdpbmpkNjQwbDg4eXhpNHEydjRxdGN4OHBrMCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/xT9IgM8YjXbF1b4Tgk/giphy.webp',
        'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZW1uMW5tcm93MnJzcnFrbmk2bGExdGJmeThjc3d3NTl1cGE4cTZ4aCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/kFNghExveIAk7fp6GX/giphy.webp',
        'https://media4.giphy.com/media/StX0uJHmCoViq6iEHq/giphy.webp?cid=790b7611emn1nmrow2rsrqkni6la1tbfy8csww59upa8q6xh&ep=v1_stickers_search&rid=giphy.webp&ct=s'
      ],
          textColor:'white',
          backgroundColor: '#e6e6fa',
          effect: 'confetti'
        },
      'Rainy': {
          images: ['https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdG1teXQycTlzbTRkcHRucDQ1MHM5MDdjeGswa3U2MGlpcXZnM3owaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/YSY7zXvQTefSraDrKs/giphy.gif',
            'https://media4.giphy.com/media/E2d2tsgz7iHo4/200.webp?cid=790b76114ticfy8bqp94uf9rdjnf84c9db082q9hy1xzxvu5&ep=v1_gifs_search&rid=200.webp&ct=g',
            'https://media3.giphy.com/media/Fn4qsKWzqapnqHlgSL/200.webp?cid=790b76114ticfy8bqp94uf9rdjnf84c9db082q9hy1xzxvu5&ep=v1_gifs_search&rid=200.webp&ct=g',
            'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd21iZnR2bjQ4ZXlxenphMDR5NTBlMm91bHd0ZTR3ZTFqd2xzdGR3MyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/6sxe09T4u3bjgATWlm/giphy.webp',
  
        ],
          textColor:'black',
          backgroundColor: '#7f8c8d',
          effect: 'rain'
        },
        'Forest': {
          "images": [
            "https://media2.giphy.com/media/3o6Zt3PlZZhIZnueCQ/200.webp?cid=790b7611ve65ljt2fav5ss4uiahyvcb8v25nk583wfe9mnt4&ep=v1_gifs_search&rid=200.webp&ct=g",
            "https://media3.giphy.com/media/iF1JVEDMrqxzno3fYt/giphy.webp?cid=790b7611dxt9tob04xq74w7udi4ig3unqmyqsskxoh97jvgq&ep=v1_stickers_search&rid=giphy.webp&ct=s",
            "https://media3.giphy.com/media/KAHW5n33VoL8gLCh5Y/giphy.webp?cid=ecf05e47154wumwnf3drewfbnfqfa9kbzkstk3gdfus87g3b&ep=v1_stickers_search&rid=giphy.webp&ct=s",
            "https://media4.giphy.com/media/4Kdmbmw1mAmqA19sYm/giphy.webp?cid=ecf05e47syezlb823k2jq4g5teywys2rth1yk25bevkklap0&ep=v1_stickers_search&rid=giphy.webp&ct=s",
            "https://media1.giphy.com/media/LODja4X9Ld96zjFlxH/200.webp?cid=ecf05e47syezlb823k2jq4g5teywys2rth1yk25bevkklap0&ep=v1_stickers_search&rid=200.webp&ct=s"
          ],
          "textColor": "white",
          "backgroundColor": "rgba(166, 172, 152, 0.62)",
          "effect": "leaves"
        },
        'Sunny Chill': {
          images: ['https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjh1M3d1ZjF3bXM5eWZmMmhycm0zN2dkbW5ud25qNHRvcmk0djVzdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/J6UJjUEg1ReqjMIAlQ/giphy.gif',
            'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWJscm02bmwxcmV3Zm16aXFxMnU1Z3R0d3JwMHA4eWV6b3JmbGJwbyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/1G6sMOocL7eeOgb6MY/giphy.webp',
            'https://media3.giphy.com/media/cekRR561cp6tpnG8ZC/giphy.webp?cid=790b7611iblrm6nl1rewfmziqq2u5gttwrp0p8yezorflbpo&ep=v1_stickers_search&rid=giphy.webp&ct=s',
            'https://media3.giphy.com/media/ZXr7mOCKSkMrnuLNEu/giphy.webp?cid=ecf05e47ng5q7ptnikvwtkwbff3rhggd5mtsthsgf7v94yr3&ep=v1_stickers_search&rid=giphy.webp&ct=s',
            'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnlpOTlzNGRpNmdidzNvcGE1cGloaHI4MDV4NG5mbHJwMWtjMTFneSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/KkxXA0oHSqBxC0fIhu/giphy.gif',
        ],
          textColor:'white',
          backgroundColor: 'url(https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjh1M3d1ZjF3bXM5eWZmMmhycm0zN2dkbW5ud25qNHRvcmk0djVzdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/J6UJjUEg1ReqjMIAlQ/giphy.gif)  center / cover no-repeat',
          effect: 'sunny'
        },
        'Attack On Titan': {
          images: ['https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjRod3ExNGpzM3ViZXZiaDJ2MmY4cjVoOGhkOWFtYTBxNGsxdGNxZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0Iy6cMi1aPIBzP32/200.webp',
            'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDFrZWowZm90a3ZnNzJycTJjczBjY3ZsODkyYnZud3ppYXo3OHc1OCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/oHWnStBAnM1RHlF1CR/giphy.webp',
            'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHE2ZnU3bzRoNDBhcm8yOXNvODhlN2Rkc3RxaGJlb2p6YThrbmNhciZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/Yc65Sk2Hwkzgk/giphy.webp',
            'https://media4.giphy.com/media/XFuS7Rr9qiGGts74Yf/giphy.webp?cid=ecf05e474t86ecfufkvnc5p17cyyzrc7d4p3xwu73wjwamar&ep=v1_stickers_search&rid=giphy.webp&ct=s',
  
        ],
          textColor:'white',
          backgroundColor: '#36454f',
          effect: 'aot'
        },
        'Ricky and Morty': {
          images: ['https://i.pinimg.com/564x/b6/37/6d/b6376dceb072f550315279a04ebe548f.jpg',
            'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXZ2anQ0aXJuNmlwbHFkdGVieTY5cXllMzB4ajVrNXppbHF5MTU0dSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/gk3R16JhLP8RUka2nD/200.webp',
            'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjRvOTVvNmZlejIwMThwNjM5bGV0ZXo4bWE2dTJ2em1pcnE3Mm5vMyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/3o7aD2d7hy9ktXNDP2/200.webp',
            'https://media0.giphy.com/media/35nU79vBbeOm4/giphy.webp?cid=790b761124o95o6fez2018p639letez8ma6u2vzmirq72no3&ep=v1_stickers_search&rid=giphy.webp&ct=s',
            'https://media2.giphy.com/media/JsEDe5fTepBIDnaZKT/200.webp?cid=790b761124o95o6fez2018p639letez8ma6u2vzmirq72no3&ep=v1_stickers_search&rid=200.webp&ct=s',
  
        ],
          textColor:'white',
          backgroundColor: 'url(https://i.pinimg.com/564x/b6/37/6d/b6376dceb072f550315279a04ebe548f.jpg) center / cover no-repeat',
          effect: ''
        },
        'Office': {
          images: ['https://media3.giphy.com/media/BY8ORoRpnJDXeBNwxg/200.webp?cid=790b7611k90n30nw8hbaulv4stcs454a3sh3l2iy2xp593oz&ep=v1_gifs_search&rid=200.webp&ct=g',
            'https://media3.giphy.com/media/BY8ORoRpnJDXeBNwxg/200.webp?cid=790b7611k90n30nw8hbaulv4stcs454a3sh3l2iy2xp593oz&ep=v1_gifs_search&rid=200.webp&ct=g',
            'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaDVnMDUxNTMxYjFpMDlyZ25kZzBtYXlscTdrNGUzdDVxbnlzbGlrMiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/lZzhBZW7kvzWYtydVA/200.webp',
            'https://media1.giphy.com/media/v1uV0oxObr9ZT48Kpa/200.webp?cid=790b7611h5g051531b1i09rgndg0maylq7k4e3t5qnyslik2&ep=v1_stickers_search&rid=200.webp&ct=s',
            'https://media0.giphy.com/media/l4FGJh0rrcvEBsIO4/giphy.webp?cid=ecf05e473lehc3hv287y5o87m7zq3e4t6006bchow335wtip&ep=v1_stickers_search&rid=giphy.webp&ct=s',
            'https://media4.giphy.com/media/rK9jBbuVeOqzY4Zg0y/giphy.webp?cid=ecf05e478d834adcybty14zl9br9ofqy7rnxwogng8aqd2pk&ep=v1_stickers_search&rid=giphy.webp&ct=s',
  
        ],
          textColor:'white',
          backgroundColor: 'url(https://i.pinimg.com/564x/42/82/a1/4282a1bb7364f273e06b9aa37966538d.jpg) center / cover no-repeat',
          effect: ''
        },
        'NewJeans': {
          images: ['https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWdreWl0NWl0aHg2MXhwbnZqZmVxc3R3c3drdnRkanNtNzd1b2hqaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/b6NgTiPadHTVmDOWnk/giphy.gif',
            'https://media0.giphy.com/media/12uxuixeCP6JBUOP17/giphy.webp?cid=790b7611dc9u1dklcosz4nkhwk8qy4unz0kazqtgbfzpxrs0&ep=v1_gifs_search&rid=giphy.webp&ct=g',
            'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjY0ZG5yeDNvOWlpdWhxb3dvM3lkMzNjcm04cTZkaHR0bWdqaHo3ZSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/BuNGhfgf3MdmsybmJt/200.webp',
            'https://media0.giphy.com/media/sYpDQe6I2gm8Y1hv37/giphy.webp?cid=790b7611etb43ti8lcpanyg7ywl2tv010eq525rmelwiyghg&ep=v1_stickers_search&rid=giphy.webp&ct=s',
            'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXRiNDN0aThsY3BhbnlnN3l3bDJ0djAxMGVxNTI1cm1lbHdpeWdoZyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/iUWxTgKI5TUKAiMNuJ/giphy.webp',
            'https://media4.giphy.com/media/5v70SvArRC2cvT31Fe/giphy.webp?cid=790b7611etb43ti8lcpanyg7ywl2tv010eq525rmelwiyghg&ep=v1_stickers_search&rid=giphy.webp&ct=s',
            'https://media0.giphy.com/media/k0jOTAeqby6hOB2ImB/giphy.webp?cid=790b7611etb43ti8lcpanyg7ywl2tv010eq525rmelwiyghg&ep=v1_stickers_search&rid=giphy.webp&ct=s',
            'https://media1.giphy.com/media/cEVZu0j794PgAlhjXP/giphy.webp?cid=790b7611etb43ti8lcpanyg7ywl2tv010eq525rmelwiyghg&ep=v1_stickers_search&rid=giphy.webp&ct=s',
            'https://media0.giphy.com/media/8rAtGb8wzdRrlLghJS/200.webp?cid=790b7611etb43ti8lcpanyg7ywl2tv010eq525rmelwiyghg&ep=v1_stickers_search&rid=200.webp&ct=ts',
            'https://media1.giphy.com/media/2uErvWMTIk4OTZZRhV/giphy.webp?cid=ecf05e47z8bzj2jbdpi0ve96g1orv7myh8gy5197a6d5bbxh&ep=v1_stickers_search&rid=giphy.webp&ct=s',
  
        ],
          textColor:'white',
          backgroundColor: '#3498db',
          effect: 'newJeans'
        },
        'Spiderman': {
          images: ['https://media4.giphy.com/media/fbHqxBmYngB1U9GTt9/200.webp?cid=790b761182ch4o74rx9v53gazx3hriihp3mfsfqxb8tyus5j&ep=v1_gifs_search&rid=200.webp&ct=g',
              'https://media3.giphy.com/media/4cyhX2dXNJaCubFydv/giphy.webp?cid=ecf05e476uo3uwfzesy38r06hfrmq3j5dlyg9m8kac29oeyg&ep=v1_stickers_search&rid=giphy.webp&ct=s',
              'https://media1.giphy.com/media/x7WXCEYwnbvDe3GM3e/giphy.webp?cid=ecf05e47rjev2g69o0quu9be1u40otu12ghq5tnlqtdlij6f&ep=v1_stickers_search&rid=giphy.webp&ct=s',
              'https://media0.giphy.com/media/zotX5LOMgQfQ1dGtTw/giphy.webp?cid=ecf05e47o257igtd4x2901masu3m7f352rqw2vhvm789hb3n&ep=v1_stickers_search&rid=giphy.webp&ct=s',
              'https://media0.giphy.com/media/TKLdhXUt2S36V1KnA6/giphy.webp?cid=ecf05e477a3o4ka26ts2dd7nuoyoenhlswihv0qy4d0ifcxe&ep=v1_stickers_search&rid=giphy.webp&ct=s'
        ],  
          textColor:'white',
          backgroundColor: 'rgb(251, 170, 173)',
          effect: 'web'
        }
      // Add more themes here as needed
    };

  //React flow context
  const getNodeId = () => `randomnode_${+new Date()}_${+Math.random(100)}}`;
  function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  }
  function CurrentDate() {
    const now = new Date();
    const formattedDate = formatDate(now);
    return formattedDate;
  }
  //const [nodes, setNodes, onNodesChange] = useNodesState([]);
  //const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const {liveblocks, nodes, setNodes, edges, setEdges, onNodesChange, onEdgesChange, addNode, updateThemeStickers,removeAllThemeStickers } = useStore();

  //user signed in
  const {user, data} =  useAuth();

  const [rfInstance, setRfInstance] = useState(null);
  const flowKey = 'example-flow';


  //Theme context
  const [alignment, setAlignment] = useState('Paper');

  const [documentId, setDocumentId] = useState(null);

  const [documentName, setDocumentName] = useState(null);

   //Iffy approach to get data from localstorage 
  //Multiple renders take place and remmeber this is Server side
  useEffect(() => {
    
  }, []);


  //Saving to localStorage methods and states
  const [isSavedBoard, setIsSavedBoard] = useState(true);

  const saveDataToLocalStorageBoard = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem('nodes', JSON.stringify(nodes));

      localStorage.setItem('theme', JSON.stringify(alignment));
      setIsSavedBoard(true); // Indicate that data has been saved
    }
  };

  

  const prevNodesRef = useRef(nodes);
  const prevAlignmentRef = useRef(alignment);
  
  const haveNodesPositionOrLengthChanged = (prevNodes, newNodes) => {
    if (prevNodes.length !== newNodes.length) return true;
    
    for (let i = 0; i < prevNodes.length; i++) {
      const prevNode = prevNodes[i];
      const newNode = newNodes.find(n => n.id === prevNode.id);
      // Assuming newNode always exists; you might need to handle cases where it doesn't
      if (!newNode || prevNode.position.x !== newNode.position.x || prevNode.position.y !== newNode.position.y) {
        return true;
      }
    }
    return false;
  };
  
  // Effect to detect relevant changes and set `isSavedBoard` to false accordingly
  useEffect(() => {
    const nodesChanged = haveNodesPositionOrLengthChanged(prevNodesRef.current, nodes);
    const alignmentChanged = prevAlignmentRef.current !== alignment;
    

    if (prevNodesRef.current.length !=0 && (nodesChanged || alignmentChanged)) {
      setIsSavedBoard(false);
    }

    // Update refs for next comparison
    prevNodesRef.current = nodes;
    prevAlignmentRef.current = alignment;
  }, [nodes, alignment]);


  //Saving
  const onSave = useCallback(() => {

    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      console.log("whats the theme", alignment)
      localStorage.setItem('theme', JSON.stringify(alignment));
      setIsSavedBoard(true)
    }
  }, [rfInstance, alignment]);


  

  const saveBoardState = async () => {
    if (!user) {
      console.log("No user logged in.");
      return; // Ensure user is logged in before trying to save data
    }
  
    console.log("User exists, saving board data to Firestore");
  
    const flow = rfInstance.toObject(); // Assuming rfInstance.toObject() serializes the board state correctly
  
    console.log("flow setyp save", flow);
    const boardState = {
      flow,
      theme: alignment,
      updatedAt: new Date(), // Store last updated time
    };
    try {
      // Use the modular SDK's methods to handle document references and set data
      const boardDocRef = doc(db, 'users', user.uid, 'boards', documentId); // flowKey should be passed correctly or defined
      await setDoc(boardDocRef, boardState, { merge: true }); // Merge true to update only provided fields
  
      setIsSavedBoard(true); // Update state to indicate the board is saved
  
    } catch (error) {
      console.error("Error saving board state to Firestore: ", error);
      notification.error({
        message: 'Failed to save!',
        description: 'Please try again.',
        icon: <AiOutlineExclamationCircle style={{ color: '#ff4d4f' }} />,
      });
    }
    
  };

  //Restore
  const onRestore = useCallback(() => {    
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      

      if (flow) {
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
      }
    };

    restoreFlow();
  }, [setNodes]);

  async function restoreBoardState(id) {
    if (!user) {
      return {message:'Failed', info:null, theme:null}; // Ensure user is logged in before fetching data
    }


    try {
      // Reference to the specific board document
      const boardDocRef = doc(db, 'users', user.uid, 'boards', id);
      const docSnap = await getDoc(boardDocRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.flow) {
          setNodes(data.flow.nodes || []);
          setEdges(data.flow.edges || []);
        }else{
          setNodes([]);
          setEdges([]);
        }
        console.log("theme", data);
        setIsSavedBoard(true);
        await setAlignment(data.theme || 'Paper');
        return {message:'Success', info:'Parsed data', theme: data.theme || 'Paper'}
      } else {
        console.log("No such document!");
        setIsSavedBoard(true);
        return {message:'Failed', info:'No such document', theme:'Paper'};
      }
    } catch (error) {
      console.error("Error retrieving board state from Firestore: ", error);
      notification.error({
        message: 'Failed to load!',
        description: `Please try again.`,
        icon: <AiOutlineExclamationCircle style={{ color: '#ff4d4f' }} />,
      });
      return {message:'Failed', info: error, theme:null};
    }
  }

  async function renameBoard(newName){
    if (!user) {
      console.log("No user logged in.");
      return; // Ensure user is logged in before trying to save data
    }

    // Get the current data
    const userData = data;

    // Find the board within the boards array
    const boardIndex = userData.boards.findIndex(board => board.id === documentId);
    
    // If the board is found
    if (boardIndex !== -1) {
      // Update the board's name
      userData.boards[boardIndex].name = newName;

      // Update the document with the new boards array
      await setDoc(doc(db, 'users', user.uid), { boards: userData.boards }, { merge: true });

      return "Success";
    } else {
      return "Error";
    }
  }
  async function deleteBoard(id){
    if (!user) {
      console.log("No user logged in.");
      return; // Ensure user is logged in before trying to save data
    }

    // Get the current data
    const userData = data;

    // Find the board within the boards array
    const newBoards = userData.boards.filter(board => board.id !== id);

    if (newBoards.length === userData.boards.length) {
      console.log("Board not found.");
      return "Board not found"; // Return an error message if the board was not found
    }


    const boardDocRef = doc(db, 'users', user.uid, 'boards', id);

    try {
      // Update the document with the new boards array
      await setDoc(doc(db, 'users', user.uid), { boards: newBoards }, { merge: true });
      await deleteDoc(boardDocRef);
      return "Success"; // Return success if the document update was successful
    } catch (error) {
      console.error("Error deleting the board:", error);
      return "Error deleting the board"; // Return an error message if there was a problem updating the document
    }
  }






  //Context for the reactFlow board

  

  // Add other states and functions you want to make globally available
  const value = {
    isSavedBoard,
    setIsSavedBoard,
    saveDataToLocalStorageBoard,

    nodes,
    setNodes,
    onNodesChange,

    edges,
    setEdges,
    onEdgesChange,

    alignment,
    setAlignment,

    rfInstance,
    setRfInstance,

    onSave,
    onRestore,
    addNode,
    updateThemeStickers,
    removeAllThemeStickers,

    liveblocks,

    saveBoardState,
    restoreBoardState,


    documentId,
    setDocumentId,

    themes,

    renameBoard,

    setDocumentName,
    documentName,

    deleteBoard



    // Add more as needed
  };


  
  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
};
