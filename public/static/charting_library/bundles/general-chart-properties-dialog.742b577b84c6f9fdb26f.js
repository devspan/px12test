(self.webpackChunktradingview=self.webpackChunktradingview||[]).push([[7078],{97326:e=>{e.exports={backButton:"backButton-ukxmTk5_"}},93484:e=>{e.exports={wrapper:"wrapper-DggvOZTm",container:"container-DggvOZTm",tab:"tab-DggvOZTm",active:"active-DggvOZTm",title:"title-DggvOZTm",icon:"icon-DggvOZTm",titleText:"titleText-DggvOZTm",nested:"nested-DggvOZTm",isTablet:"isTablet-DggvOZTm",isMobile:"isMobile-DggvOZTm"}},91263:e=>{e.exports={"tablet-normal-breakpoint":"screen and (max-width: 768px)","tablet-small-breakpoint":"screen and (max-width: 428px)",withSidebar:"withSidebar-1e-cIUlp",content:"content-1e-cIUlp",tabContent:"tabContent-1e-cIUlp",applyToAllButton:"applyToAllButton-1e-cIUlp"}},62358:e=>{e.exports={themesButtonText:"themesButtonText-3vn5WLwC",themesButtonIcon:"themesButtonIcon-3vn5WLwC",defaultsButtonText:"defaultsButtonText-3vn5WLwC",defaultsButtonItem:"defaultsButtonItem-3vn5WLwC"}},78706:e=>{e.exports={separator:"separator-eqcGT_ow",small:"small-eqcGT_ow",normal:"normal-eqcGT_ow",large:"large-eqcGT_ow"}},45745:(e,t,i)=>{"use strict";i.d(t,{DialogSidebarContainer:()=>m,DialogSidebarWrapper:()=>h,DialogSidebarItem:()=>d});var n=i(67294),l=i(94184),a=i.n(l),o=i(49775),s=i(5186),r=i(93484);function c(e){return{isMobile:"mobile"===e,isTablet:"tablet"===e}}function m(e){const{mode:t,className:i,...l}=e,{isMobile:o,isTablet:s}=c(t),m=a()(r.container,s&&r.isTablet,o&&r.isMobile,i);return n.createElement("div",{...l,className:m,"data-role":"dialog-sidebar"})}function h(e){return n.createElement("div",{className:r.wrapper,...e})}function d(e){const{mode:t,title:i,icon:l,isActive:m,onClick:h,...d}=e,{isMobile:p,isTablet:u}=c(t);return n.createElement("div",{...d,className:a()(r.tab,u&&r.isTablet,p&&r.isMobile,m&&r.active),onClick:h},n.createElement(o.Icon,{className:r.icon,icon:l}),!u&&n.createElement("span",{className:r.title},n.createElement("span",{className:r.titleText},i),p&&n.createElement(o.Icon,{className:r.nested,icon:s})))}},76270:(e,t,i)=>{"use strict";i.r(t),i.d(t,{GeneralChartPropertiesDialogRenderer:()=>J});var n=i(79881),l=i(67294),a=i(73935),o=i(80511),s=i(9102),r=i(7591),c=i(63544),m=i(35665),h=i(64222),d=i.n(h),p=i(1799),u=i(68521),b=i(49775),g=i(19522),T=i(95860),C=i(10869),_=i(99182),y=(i(95068),i(87614));const v=(0,n.t)("Do you really want to delete Color Theme '{name}' ?");var S=i(78106),k=i(22675),A=i(14303),f=i(87438),P=i(11086),w=i(96404),E=i(62358);function M(e){const{themeName:t,chartWidgetCollection:i,onRemove:n,manager:a}=e,[o,s]=(0,P.useHover)(),r=l.useCallback(()=>function(e,t,i){window.is_authenticated&&(0,y.showConfirm)({text:v.format({name:e}),onConfirm:({dialogClose:i})=>{(0,_.removeTheme)(e),t&&t(e),i()}},i)}(t,n,a),[t,n,a]),c=l.useCallback(()=>{(0,_.loadTheme)(t,!1,!1,i).then(()=>{i.readOnly()||window.saver.saveChartSilently(),(0,f.trackEvent)("GUI","Switch to custom theme")})},[t,i]);return l.createElement("div",{...s},l.createElement(T.PopupMenuItem,{className:E.defaultsButtonItem,isActive:!1,label:t,onClick:c,toolbox:l.createElement(A.RemoveButton,{hidden:!w.mobiletouch&&!o,
onClick:r})}))}var B=i(22775);const D=(0,n.t)("Template"),x=(0,n.t)("Apply defaults"),I=((0,k.appendEllipsis)((0,n.t)("Save as")),(0,n.t)("Apply to all"));class N extends l.PureComponent{constructor(e){super(e),this._manager=null,this._handleApplyDefaults=()=>{const{model:e,chartWidgetCollection:t}=this.props;e.restorePreferences();const i=(0,_.getCurrentTheme)().name;(0,_.loadTheme)(i,!0,!0,t,void 0,void 0,!0)},this._handleSaveAs=()=>{0},this._handleRemoveTheme=e=>{this.setState({themes:this.state.themes.filter(t=>t!==e)})},this._syncThemeList=()=>{0},this.state={themes:[]},this._syncThemeList()}render(){return l.createElement(S.SlotContext.Consumer,null,e=>(this._manager=e,l.createElement(u.MatchMedia,{rule:"screen and (max-width: 768px)"},e=>l.createElement(g.DisclosureMenu,{id:"series-theme-manager",className:!e&&E.themesButtonText,hideArrowButton:e,"data-name":"theme-select",buttonChildren:this._getPlaceHolderItem(e)},this._getThemeItems(e)))))}_getPlaceHolderItem(e){return e?l.createElement(b.Icon,{className:E.themesButtonIcon,icon:B}):D}_getThemeItems(e){const{isApplyToAllVisible:t,chartWidgetCollection:i,applyToAllCallback:n}=this.props,{themes:a}=this.state;return l.createElement(l.Fragment,null,e&&t&&l.createElement(T.PopupMenuItem,{className:E.defaultsButtonItem,isActive:!1,label:I,onClick:n}),l.createElement(T.PopupMenuItem,{className:E.defaultsButtonItem,isActive:!1,label:x,onClick:this._handleApplyDefaults}),!1,a.length>0&&l.createElement(l.Fragment,null,l.createElement(C.PopupMenuSeparator,{key:"separator"}),a.map(e=>l.createElement(M,{key:e,themeName:e,onRemove:this._handleRemoveTheme,chartWidgetCollection:i,manager:this._manager}))))}}var W=i(79424),z=i(87131),L=i(72923),R=i(45745),V=i(73991);const O={areaSymbolMinTick:"normal",areaSymbolTimezone:"normal",barSymbolMinTick:"normal",barSymbolTimezone:"normal",baselineSymbolMinTick:"normal",baselineSymbolTimezone:"normal",candleSymbolMinTick:"normal",candleSymbolTimezone:"normal",dateFormat:"normal",haSymbolMinTick:"normal",haSymbolTimezone:"normal",hiloSymbolMinTick:"normal",hiloSymbolTimezone:"normal",hollowCandleSymbolMinTick:"normal",hollowCandleSymbolTimezone:"normal",kagiAtrLength:"normal",kagiReversalAmount:"normal",kagiStyle:"normal",kagiSymbolMinTick:"normal",kagiSymbolTimezone:"normal",lineSymbolMinTick:"normal",lineSymbolTimezone:"normal",sessionId:"normal",lockScale:"normal",mainSeriesSymbolAreaPriceSource:"normal",mainSeriesSymbolBaseLevelPercentage:"normal",mainSeriesSymbolBaseLinePriceSource:"normal",mainSeriesSymbolLinePriceSource:"normal",mainSeriesSymbolStyleType:"normal",navButtons:"big",paneButtons:"big",pbLb:"normal",pbSymbolMinTick:"normal",pbSymbolTimezone:"normal",pnfAtrLength:"normal",pnfBoxSize:"normal",pnfReversalAmount:"normal",pnfSources:"normal",pnfStyle:"normal",pnfSymbolMinTick:"normal",pnfSymbolTimezone:"normal",rangeSymbolMinTick:"normal",rangeSymbolTimezone:"normal",renkoAtrLength:"normal",renkoBoxSize:"normal",renkoStyle:"normal",renkoSymbolMinTick:"normal",renkoSymbolTimezone:"normal",scalesPlacement:"normal",
symbolLastValueLabel:"big",symbolTextSource:"normal"};var q=i(97326),Z=i(38002);function U(e){return l.createElement(b.Icon,{className:q.backButton,icon:Z,onClick:e.onClick})}var G=i(91263);class H extends l.PureComponent{constructor(e){super(e),this._renderChildren=({requestResize:e,isSmallWidth:t})=>(this._requestResize=e,l.createElement("div",{className:G.content},this._renderTabs(t),this._renderTabContent(t))),this._renderApplyToAllButton=()=>l.createElement(u.MatchMedia,{rule:L.DialogBreakpoints.TabletNormal},e=>this._renderApplyToAll(e)),this._renderFooterLeft=()=>{const{model:e,chartWidgetCollection:t}=this.props,{isApplyToAllVisible:i}=this.state;return l.createElement(N,{model:e,isApplyToAllVisible:i,applyToAllCallback:this._handleApplyToAll,chartWidgetCollection:t})},this._createTabClickHandler=e=>()=>this._selectPage(e),this._selectPage=e=>{const{activePage:t}=this.state;e!==t&&(t&&t.definitions.unsubscribe(this._onChangeActivePageDefinitions),d().setValue("properties_dialog.last_page_id",e.id),e.definitions.subscribe(this._onChangeActivePageDefinitions),this.setState({activePage:e,tableKey:Date.now()},()=>{this._requestResize&&this._requestResize()}))},this._onChangeActivePageDefinitions=()=>{z.logger.logNormal("Definition collection was updated"),this.setState({tableKey:Date.now()},()=>{this._requestResize&&this._requestResize()})},this._handleCancel=()=>{this.props.onCancel(),this.props.onClose()},this._handleSubmit=()=>{this.props.onSubmit(),this.props.onClose()},this._handleScroll=()=>{W.globalCloseDelegate.fire()},this._handleApplyToAll=()=>{const{chartWidgetCollection:e,model:t}=this.props,{isApplyToAllVisible:i}=this.state;i&&e.applyPreferencesToAllCharts(t)},this._syncApplyToAllVisibility=()=>{const{chartWidgetCollection:e}=this.props;this.setState({isApplyToAllVisible:(0,p.isMultipleLayout)(e.layout.value())})},this._handleBackClick=()=>{const{activePage:e}=this.state;e&&e.definitions.unsubscribe(this._onChangeActivePageDefinitions),this.setState({activePage:null})};const{pages:t,activePageId:i}=e;let n=t.find(e=>e.id===i);if(!n){const e=d().getValue("properties_dialog.last_page_id"),i=t.find(t=>t.id===e);n=i||t[0]}this.state={activePage:n,isApplyToAllVisible:(0,p.isMultipleLayout)(e.chartWidgetCollection.layout.value()),tableKey:Date.now()}}componentDidMount(){const{chartWidgetCollection:e}=this.props,{activePage:t}=this.state;e.layout.subscribe(this._syncApplyToAllVisibility),t&&t.definitions.subscribe(this._onChangeActivePageDefinitions)}componentWillUnmount(){const{chartWidgetCollection:e}=this.props,{activePage:t}=this.state;t&&t.definitions.unsubscribe(this._onChangeActivePageDefinitions),e.layout.unsubscribe(this._syncApplyToAllVisibility)}render(){const{isOpened:e,onClose:t}=this.props,{activePage:i}=this.state;return l.createElement(u.MatchMedia,{rule:L.DialogBreakpoints.TabletSmall},a=>l.createElement(r.AdaptiveConfirmDialog,{className:G.withSidebar,dataName:"series-properties-dialog",onClose:t,isOpened:e,title:null!==i&&a?i.title:(0,n.t)("Chart settings"),
footerLeftRenderer:this._renderFooterLeft,additionalButtons:this._renderApplyToAllButton(),additionalHeaderElement:null!==i&&a?l.createElement(U,{onClick:this._handleBackClick}):void 0,onSubmit:this._handleSubmit,onCancel:this._handleCancel,render:this._renderChildren,submitOnEnterKey:!1}))}_renderTabContent(e){const{pages:t}=this.props,i=this._getCurrentPage(e);if(i){const e=t.find(e=>e.id===i.id),n=e?e.definitions.value():[];return l.createElement(V.TouchScrollContainer,{className:G.tabContent,onScroll:this._handleScroll},l.createElement(c.ControlCustomWidthContext.Provider,{value:O},l.createElement(m.PropertyTable,{key:this.state.tableKey},n.map(e=>l.createElement(s.Section,{key:e.id,definition:e})))))}return null}_renderTabs(e){const{pages:t}=this.props,{activePage:i}=this.state;if(i&&e)return null;const n=this._getCurrentPage(e);return l.createElement(u.MatchMedia,{rule:L.DialogBreakpoints.TabletNormal},e=>l.createElement(u.MatchMedia,{rule:L.DialogBreakpoints.TabletSmall},i=>{const a=i?"mobile":e?"tablet":void 0;return l.createElement(R.DialogSidebarContainer,{mode:a,onScroll:this._handleScroll},t.map(e=>l.createElement(R.DialogSidebarItem,{key:e.id,mode:a,"data-name":e.id,title:e.title,icon:e.icon,onClick:this._createTabClickHandler(e),isActive:n?e.id===n.id:void 0})))}))}_renderApplyToAll(e){const{isApplyToAllVisible:t}=this.state;return!e&&t&&l.createElement("span",{className:G.applyToAllButton},l.createElement(o.Button,{appearance:"stroke",onClick:this._handleApplyToAll},(0,n.t)("Apply to all")))}_getCurrentPage(e){const{pages:t}=this.props,{activePage:i}=this.state;let n=null;return i?n=i:!e&&t.length&&(n=t[0]),n}}var F=i(18437),K=i(58738);const j=(0,n.t)("Chart settings");class J extends K.DialogRenderer{constructor(e){super(),this._handleClose=()=>{a.unmountComponentAtNode(this._container),this._setVisibility(!1),this._onClose&&this._onClose()},this._handleSubmit=()=>{},this._handleCancel=()=>{this._model.undoToCheckpoint(this._checkpoint)},this._propertyPages=e.propertyPages,this._model=e.model,this._activePageId=e.activePageId,this._onClose=e.onClose,this._chartWidgetCollection=e.chartWidgetCollection,this._checkpoint=this._ensureCheckpoint(e.undoCheckPoint)}hide(e){e?this._handleCancel():this._handleSubmit(),this._handleClose()}isVisible(){return this.visible().value()}show(){a.render(l.createElement(H,{title:j,isOpened:!0,onSubmit:this._handleSubmit,onClose:this._handleClose,onCancel:this._handleCancel,pages:this._propertyPages,model:this._model,activePageId:this._activePageId,chartWidgetCollection:this._chartWidgetCollection}),this._container),this._setVisibility(!0),F.emit("edit_object_dialog",{objectType:"mainSeries",scriptTitle:this._model.mainSeries().title()})}_ensureCheckpoint(e){return void 0===e&&(e=this._model.createUndoCheckpoint()),e}}},10869:(e,t,i)=>{"use strict";i.d(t,{PopupMenuSeparator:()=>s});var n=i(67294),l=i(94184),a=i.n(l),o=i(78706);function s(e){const{size:t="normal",className:i}=e;return n.createElement("div",{
className:a()(o.separator,"small"===t&&o.small,"normal"===t&&o.normal,"large"===t&&o.large,i)})}},5186:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="none"><path stroke="currentcolor" strokeWidth="1.3" d="M12 9l5 5-5 5"/></svg>'}}]);