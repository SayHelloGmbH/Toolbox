(()=>{"use strict";const e=window.wp.blocks,t=window.wp.blockEditor,a=window.wp.components,l=window.wp.data,r=window.wp.element,o=window.wp.primitives,i=(0,r.createElement)(o.SVG,{xmlns:"https://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,r.createElement)(o.Path,{d:"M4 5.417h2.267V12h1.466V5.417H10V4H4v1.417ZM20 16H4v-1.5h16V16Zm-7 4H4v-1.5h9V20Z"})),n=window.wp.i18n,s=e=>{let{props:a}=e;const{overlayColor:l,setOverlayColor:r}=a;return React.createElement(t.PanelColorSettings,{title:(0,n._x)("Farbeinstellungen","Panel label","sha"),initialOpen:!1,colorSettings:[{value:l.color,onChange:r,label:(0,n._x)("Overlay-Farbe","Color settings label","sha")}]})},c=JSON.parse('{"name":"sht/page-header"}'),{name:d}=c,m=(0,e.getBlockDefaultClassName)(d);(0,e.registerBlockType)(d,{icon:i,getEditWrapperProps:e=>({...e,"data-align":"full"}),edit:(0,t.withColors)("overlayColor")((function(e){const r=(0,t.useBlockProps)(),{attributes:o,setAttributes:i}=e,{overlayColor:n}=o,c=(0,l.useSelect)((e=>e("core/editor").getEditedPostAttribute("title")))||"[Seitentitel]",d=(0,l.useSelect)((e=>e("core/editor").getEditedPostAttribute("featured_media"))),u=(0,l.useSelect)((e=>e("core").getMedia(d,{context:"view"})));return React.createElement(React.Fragment,null,React.createElement(t.InspectorControls,null,React.createElement(a.PanelBody,null,React.createElement(s,{props:e,overlayColor:n,setOverlayColor:e=>{i({overlayColor:e})}}))),React.createElement("div",r,n&&React.createElement("span",{"aria-hidden":"true",className:`${m}__background has-${n}-background-color`}),!u?.source_url&&React.createElement("div",{className:`${m}__figure ${m}__figure--empty`}),u?.source_url&&React.createElement("div",{className:`${m}__figure`},React.createElement("img",{src:u?.source_url||"",srcset:(w=u?.media_details?.sizes,w?Object.entries(w).map((e=>`${e[1]?.source_url} ${e[1]?.width}w`)).join(", "):""),alt:u?.alt_text||"",className:`${m}__image`,width:u?.media_details?.width,height:u?.media_details?.height,loading:"eager"})),React.createElement("div",{className:`${m}__outer`},React.createElement("div",{className:`${m}__inner`},React.createElement("h1",{className:`${m}__title`,dangerouslySetInnerHTML:{__html:c}})))));var w}))})})();