'use client'
import React, {useState,useEffect,useCallback} from 'react';
import ReactFlow, { MiniMap, Controls,Background, useNodesState, useEdgesState, addEdge,ReactFlowProvider } from 'reactflow';
import styles from "./InfinitaCanvas.module.css"
import ToDoTaskNode from './ToDoTask/ToDoTaskNode';
import 'reactflow/dist/style.css';
import BasicTools from './BasicTools/BasicTools';
import StickyNote from './StickyNote/StickyNote';
import DraggableTimer from './Timer/DraggableTimer';
import ParticleEffect from './ParticleJs/ParticleEffect';
import SideBar from './SideBar/SideBar';
import ImageNode from './CoolStuff/ImageNode';
import Stickers from './CoolStuff/Stickers';
import Video from './Video/Video';
import VideoSearch from './VideoSearch/VideoSearch';
import FlashCards from './FlashCards/FlashCards';


const snapGrid = [10, 10];




const defaultViewport = { x: 0, y: 0, zoom: 0.75 };
const initBgColor = 'white';
const snowColor= 'rgb(148, 213, 255)';
const nodeTypes = {
    taskListNode: ToDoTaskNode,
    stickyNote: StickyNote,
    timer: DraggableTimer,
    stickers: ImageNode,
    video: Video,
    flashCards: FlashCards
  };

const themes = {
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

export default function InfiniteCanvas({}){

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [bgColor, setBgColor] = useState(initBgColor);
  const [selectedEffect, setSelectedEffect] = useState('')
  const [showEffect, setShowEffect] = useState(false);
  const [showSideBar, setShowSidebar] = useState(false);

  //For theme selection
  const [alignment, setAlignment] = useState('');

  const [themeStickers, setThemeStickers, onStickerNodeChange] = useNodesState([]);

  const getNodeId = () => `randomnode_${+new Date()}_${+Math.random(100)}}`;

  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  useEffect(() => {

    setNodes([
      {

      id: getNodeId(),
      type: 'timer',
      style: {padding: 4 },
      position: {
        x:window.innerWidth /2 +110,
        y: 10,
        },
      },
      {

        id: getNodeId(),
        type: 'stickyNote',
        style: {padding: 4 },
        position: {
          x:window.innerWidth /5 *4,
          y: 300,
          },
        },
      {

        id: getNodeId(),
        type: 'stickyNote',
        style: {padding: 4 },
        position: {
          x:window.innerWidth /5 *4 +100,
          y: 400,
          },
        },
        {

          id: getNodeId(),
          type: 'stickyNote',
          style: {padding: 4 },
          position: {
            x:window.innerWidth /5 *4 +200,
            y: 500,
            },
          },
          {

            id: getNodeId(),
            type: 'taskListNode',
            dragHandle: '.dragHandle',
            style: {padding: 4 },
            position: {
              x:window.innerWidth /5,
              y: 300,
              },
            },
            {

              id: getNodeId(),
              type: 'video',
              style: {padding: 10 },
              position: {
                x:window.innerWidth /2,
                y: 300,
                },
              },

            {

              id: getNodeId(),
              type: 'flashCards',
              style: {padding: 10 },
              position: {
                x:window.innerWidth /2,
                y: 300,
                },
              }

    ]);

    
    const themeKeys = Object.keys(themes);
    const randomIndex = Math.floor(Math.random() * themeKeys.length);
    const randomTheme = themeKeys[randomIndex];
    setAlignment(randomTheme)
    if(changeTheme){
      changeTheme(randomTheme) 
    }
  }, []);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(

    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );
  
  const onAdd = (type) => {
    let dragHandle = '';
    if (type == 'taskListNode'){
      dragHandle = '.dragHandle'
    }
    const newNode = {
      id: getNodeId(),
      type: type,
      dragHandle: dragHandle,
      style: {padding: 4 },
      position: {
        x: Math.random() * window.innerWidth +100,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  };
  const onAddStcikers = (url) => {
    console.log("add image url", url)

    const newNode = {
      id: getNodeId(),
      type: 'stickers',
      data:{url:url},
      style: {padding: 4 },
      position: {
        x: Math.random() * window.innerWidth +100,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  };
  const onAddVideoFunction = (url) => {
    console.log("add image url", url)

    const newNode = {
      id: getNodeId(),
      type: 'video',
      data:{url:url},
      style: {padding: 4 },
      position: {
        x: (Math.random() * window.innerWidth /2) + window.innerWidth/4 ,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const changeTheme = (themeName) => {
    console.log("theme info", themeName);
    let theme = themes[themeName];
    setBgColor(theme.backgroundColor);
    setSelectedEffect(theme.effect);
    setShowEffect(theme.effect !== '');
  
    let themeStickerTemp = [];
    if (theme.images && theme.images.length > 1) {
      console.log("add image");
      theme.images.forEach((url,index) => {
        if (index ==0){
          return
        }
        console.log("add image url", url);
  
        const newNode = {
          id: `themeStickers_${getNodeId(theme.name)}`, // Modify this to include theme identifier
          type: 'stickers',
          data: { url: url },
          style: { padding: 4 },
          position: {
            x: Math.random() * window.innerWidth - 100,
            y: Math.random() * window.innerHeight,
          },
        };
        themeStickerTemp.push(newNode);
      });
    }
  
    // Filter out old theme stickers before adding new ones
    setNodes((currentNodes) => {
      const filteredNodes = currentNodes.filter((node) => !node.id.startsWith('themeStickers'));
      return [...filteredNodes, ...themeStickerTemp];
    });
  };

  
  



  return (
    <div style={{ height: '100vh', width:'100%' }}>

      <ReactFlowProvider>
      <ReactFlow 
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}

      style={{ background: bgColor, 'imageRendering': '-webkit-optimize-contrast' }}

        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        attributionPosition="bottom-left"
        snapToGrid={false}
        snapGrid={snapGrid}
        defaultViewport={defaultViewport}
        onConnect={onConnect}

        onDrop={onDrop}
        onDragOver={onDragOver}
        >
        {showEffect && <ParticleEffect selectedEffect={selectedEffect}></ParticleEffect> }
      <Background size={1.4} variant="dots"></Background>
      </ReactFlow>
        <BasicTools setShowSidebar={setShowSidebar} showSideBar={showSideBar} addingNode={onAdd}></BasicTools>
        <VideoSearch setShowSidebar={setShowSidebar} onAddVideoFunction={onAddVideoFunction}></VideoSearch>
        <SideBar alignment={alignment} setAlignment={setAlignment} themes={themes} isVisible={true} setShowSidebar={setShowSidebar} showSideBar={showSideBar} changeTheme={changeTheme} addImageFunction={onAddStcikers}></SideBar>
      </ReactFlowProvider>
    </div>
  );
};

