(()=>{"use strict";const e=window.wp.blocks,t=window.wp.blockEditor,n=window.wp.components,l=window.wp.i18n,a=React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",height:"48",viewBox:"0 -960 960 960",width:"48"},React.createElement("path",{d:"M80-675h140v390H80v-390Zm200-85h400v560H280v-560Zm60 60v440-440Zm400 25h140v390H740v-390Zm-400-25v440h280v-440H340Z"})),r=JSON.parse('{"name":"sht/carousel"}'),{name:c}=r,o=(0,e.getBlockDefaultClassName)(c);function s(e){let{className:a,rootClientId:r}=e;return React.createElement(t.Inserter,{rootClientId:r,renderToggle:e=>{let{onToggle:t,disabled:r}=e;return React.createElement(n.IconButton,{className:a,onClick:t,disabled:r,label:(0,l.__)("Neuen Karussell-Eintrag hinzufügen","sha"),icon:"plus"})},isAppender:!0})}(0,e.registerBlockType)(c,{icon:a,getEditWrapperProps:e=>({...e,"data-align":"full"}),edit:e=>{let{clientId:n}=e;const l=(0,t.useBlockProps)();return React.createElement("div",l,React.createElement("div",{className:`${o}__entries`},React.createElement(t.InnerBlocks,{allowedBlocks:["sht/carousel-entry"],template:[["sht/carousel-entry"]],templateLock:!1,_renderAppender:()=>React.createElement(s,{rootClientId:n,className:`${o}__button-block-appender`})})))},save:()=>React.createElement(t.InnerBlocks.Content,null)})})();