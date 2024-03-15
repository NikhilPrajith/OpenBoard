import React, { useState } from 'react';
import styles from "./Themes.module.css";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function Themes({changeTheme}) {
  const [alignment, setAlignment] = useState('');
  const [themeData, setThemeData] = useState({});

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
        backgroundColor: 'e6e6fa',
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
            'https://media0.giphy.com/media/sTmajIUJxdMvsm7vxZ/giphy.webp?cid=ecf05e47g03m4n0bs2k6nzf630fmc401jwlsbfzxzqq3csxx&ep=v1_stickers_search&rid=giphy.webp&ct=s',
            'https://media0.giphy.com/media/zotX5LOMgQfQ1dGtTw/giphy.webp?cid=ecf05e47o257igtd4x2901masu3m7f352rqw2vhvm789hb3n&ep=v1_stickers_search&rid=giphy.webp&ct=s',
            'https://media0.giphy.com/media/TKLdhXUt2S36V1KnA6/giphy.webp?cid=ecf05e477a3o4ka26ts2dd7nuoyoenhlswihv0qy4d0ifcxe&ep=v1_stickers_search&rid=giphy.webp&ct=s'
      ],  
        textColor:'white',
        backgroundColor: 'rgb(251, 170, 173)',
        effect: 'web'
      }
    // Add more themes here as needed
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    changeTheme(themes[newAlignment])

  };

  return (
    <div className={styles.container}>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="Theme selection"
        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center' }}
      >
        <div style={{margin:'16px', paddingTop:'8px', width:'100%'}} className="grid grid-cols-2 gap-4">
        {Object.keys(themes).map((themeKey) => (
          <ToggleButton
            key={themeKey}
            value={themeKey}
                style={{color: `${themes[themeKey].textColor}`,backgroundSize:'cover',backgroundPosition:'center', backgroundImage:`url(${themes[themeKey].images[0]})`, fontFamily: 'inherit', fontSize: '9px', textTransform: 'none', padding: '5px', width: '100%', borderRadius: '25px', marginRight: '10px' }}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgb(120, 151, 213)', // Example styling, adjust as needed
                border:'2px black solid'
              },
            }}
          >
            {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
          </ToggleButton>
        ))}
        </div>
      </ToggleButtonGroup>

      {/* Render theme data or handle it however you need */}
    </div>
  );
}
