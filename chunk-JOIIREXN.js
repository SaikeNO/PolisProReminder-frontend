import{Aa as De,Ba as P,Ca as W,Cc as Ee,Ec as X,Ja as ge,Kc as Q,Ta as Z,Ua as pe,Yb as Fe,Zb as m,_b as h,ja as de,ka as le,ma as I,na as he,nb as w,pa as R,pb as me,ra as L,sa as B,tb as K,wb as q,xc as ye,ya as fe,yc as Ce}from"./chunk-WRJUXR2E.js";var Me=null;function J(){return Me}function en(e){Me??=e}var we=class{};var Le=new R(""),Re=(()=>{let t=class t{historyGo(n){throw new Error("")}};t.\u0275fac=function(i){return new(i||t)},t.\u0275prov=I({token:t,factory:()=>B(xe),providedIn:"platform"});let e=t;return e})();var xe=(()=>{let t=class t extends Re{constructor(){super(),this._doc=B(Le),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return J().getBaseHref(this._doc)}onPopState(n){let i=J().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",n,!1),()=>i.removeEventListener("popstate",n)}onHashChange(n){let i=J().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",n,!1),()=>i.removeEventListener("hashchange",n)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(n){this._location.pathname=n}pushState(n,i,s){this._history.pushState(n,i,s)}replaceState(n,i,s){this._history.replaceState(n,i,s)}forward(){this._history.forward()}back(){this._history.back()}historyGo(n=0){this._history.go(n)}getState(){return this._history.state}};t.\u0275fac=function(i){return new(i||t)},t.\u0275prov=I({token:t,factory:()=>new t,providedIn:"platform"});let e=t;return e})();function Be(e,t){if(e.length==0)return t;if(t.length==0)return e;let r=0;return e.endsWith("/")&&r++,t.startsWith("/")&&r++,r==2?e+t.substring(1):r==1?e+t:e+"/"+t}function Ae(e){let t=e.match(/#|\?|$/),r=t&&t.index||e.length,n=r-(e[r-1]==="/"?1:0);return e.slice(0,n)+e.slice(r)}function M(e){return e&&e[0]!=="?"?"?"+e:e}var ue=(()=>{let t=class t{historyGo(n){throw new Error("")}};t.\u0275fac=function(i){return new(i||t)},t.\u0275prov=I({token:t,factory:()=>B(ze),providedIn:"root"});let e=t;return e})(),Ue=new R(""),ze=(()=>{let t=class t extends ue{constructor(n,i){super(),this._platformLocation=n,this._removeListenerFns=[],this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??B(Le).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(n){this._removeListenerFns.push(this._platformLocation.onPopState(n),this._platformLocation.onHashChange(n))}getBaseHref(){return this._baseHref}prepareExternalUrl(n){return Be(this._baseHref,n)}path(n=!1){let i=this._platformLocation.pathname+M(this._platformLocation.search),s=this._platformLocation.hash;return s&&n?`${i}${s}`:i}pushState(n,i,s,o){let u=this.prepareExternalUrl(s+M(o));this._platformLocation.pushState(n,i,u)}replaceState(n,i,s,o){let u=this.prepareExternalUrl(s+M(o));this._platformLocation.replaceState(n,i,u)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(n=0){this._platformLocation.historyGo?.(n)}};t.\u0275fac=function(i){return new(i||t)(L(Re),L(Ue,8))},t.\u0275prov=I({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var je=(()=>{let t=class t{constructor(n){this._subject=new pe,this._urlChangeListeners=[],this._urlChangeSubscription=null,this._locationStrategy=n;let i=this._locationStrategy.getBaseHref();this._basePath=He(Ae(Se(i))),this._locationStrategy.onPopState(s=>{this._subject.emit({url:this.path(!0),pop:!0,state:s.state,type:s.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(n=!1){return this.normalize(this._locationStrategy.path(n))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(n,i=""){return this.path()==this.normalize(n+M(i))}normalize(n){return t.stripTrailingSlash(Ge(this._basePath,Se(n)))}prepareExternalUrl(n){return n&&n[0]!=="/"&&(n="/"+n),this._locationStrategy.prepareExternalUrl(n)}go(n,i="",s=null){this._locationStrategy.pushState(s,"",n,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(n+M(i)),s)}replaceState(n,i="",s=null){this._locationStrategy.replaceState(s,"",n,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(n+M(i)),s)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(n=0){this._locationStrategy.historyGo?.(n)}onUrlChange(n){return this._urlChangeListeners.push(n),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(n);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(n="",i){this._urlChangeListeners.forEach(s=>s(n,i))}subscribe(n,i,s){return this._subject.subscribe({next:n,error:i,complete:s})}};t.normalizeQueryParams=M,t.joinWithSlash=Be,t.stripTrailingSlash=Ae,t.\u0275fac=function(i){return new(i||t)(L(ue))},t.\u0275prov=I({token:t,factory:()=>Ve(),providedIn:"root"});let e=t;return e})();function Ve(){return new je(L(ue))}function Ge(e,t){if(!e||!t.startsWith(e))return t;let r=t.substring(e.length);return r===""||["/",";","?","#"].includes(r[0])?r:t}function Se(e){return e.replace(/\/index.html$/,"")}function He(e){if(new RegExp("^(https?:)?//").test(e)){let[,r]=e.split(/\/\/[^\/]+/);return r}return e}var D=function(e){return e[e.Format=0]="Format",e[e.Standalone=1]="Standalone",e}(D||{}),d=function(e){return e[e.Narrow=0]="Narrow",e[e.Abbreviated=1]="Abbreviated",e[e.Wide=2]="Wide",e[e.Short=3]="Short",e}(d||{}),p=function(e){return e[e.Short=0]="Short",e[e.Medium=1]="Medium",e[e.Long=2]="Long",e[e.Full=3]="Full",e}(p||{}),b={Decimal:0,Group:1,List:2,PercentSign:3,PlusSign:4,MinusSign:5,Exponential:6,SuperscriptingExponent:7,PerMille:8,Infinity:9,NaN:10,TimeSeparator:11,CurrencyDecimal:12,CurrencyGroup:13};function Ye(e){return m(e)[h.LocaleId]}function We(e,t,r){let n=m(e),i=[n[h.DayPeriodsFormat],n[h.DayPeriodsStandalone]],s=F(i,t);return F(s,r)}function Ze(e,t,r){let n=m(e),i=[n[h.DaysFormat],n[h.DaysStandalone]],s=F(i,t);return F(s,r)}function Ke(e,t,r){let n=m(e),i=[n[h.MonthsFormat],n[h.MonthsStandalone]],s=F(i,t);return F(s,r)}function qe(e,t){let n=m(e)[h.Eras];return F(n,t)}function k(e,t){let r=m(e);return F(r[h.DateFormat],t)}function N(e,t){let r=m(e);return F(r[h.TimeFormat],t)}function $(e,t){let n=m(e)[h.DateTimeFormat];return F(n,t)}function H(e,t){let r=m(e),n=r[h.NumberSymbols][t];if(typeof n>"u"){if(t===b.CurrencyDecimal)return r[h.NumberSymbols][b.Decimal];if(t===b.CurrencyGroup)return r[h.NumberSymbols][b.Group]}return n}function Oe(e){if(!e[h.ExtraData])throw new Error(`Missing extra locale data for the locale "${e[h.LocaleId]}". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`)}function Xe(e){let t=m(e);return Oe(t),(t[h.ExtraData][2]||[]).map(n=>typeof n=="string"?ee(n):[ee(n[0]),ee(n[1])])}function Qe(e,t,r){let n=m(e);Oe(n);let i=[n[h.ExtraData][0],n[h.ExtraData][1]],s=F(i,t)||[];return F(s,r)||[]}function F(e,t){for(let r=t;r>-1;r--)if(typeof e[r]<"u")return e[r];throw new Error("Locale data API: locale data undefined")}function ee(e){let[t,r]=e.split(":");return{hours:+t,minutes:+r}}var Je=/^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,x={},et=/((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/,S=function(e){return e[e.Short=0]="Short",e[e.ShortGMT=1]="ShortGMT",e[e.Long=2]="Long",e[e.Extended=3]="Extended",e}(S||{}),c=function(e){return e[e.FullYear=0]="FullYear",e[e.Month=1]="Month",e[e.Date=2]="Date",e[e.Hours=3]="Hours",e[e.Minutes=4]="Minutes",e[e.Seconds=5]="Seconds",e[e.FractionalSeconds=6]="FractionalSeconds",e[e.Day=7]="Day",e}(c||{}),a=function(e){return e[e.DayPeriods=0]="DayPeriods",e[e.Days=1]="Days",e[e.Months=2]="Months",e[e.Eras=3]="Eras",e}(a||{});function tt(e,t,r,n){let i=dt(e);t=A(r,t)||t;let o=[],u;for(;t;)if(u=et.exec(t),u){o=o.concat(u.slice(1));let E=o.pop();if(!E)break;t=E}else{o.push(t);break}let g=i.getTimezoneOffset();n&&(g=Pe(n,g),i=ct(i,n,!0));let _="";return o.forEach(E=>{let v=ut(E);_+=v?v(i,r,g):E==="''"?"'":E.replace(/(^'|'$)/g,"").replace(/''/g,"'")}),_}function G(e,t,r){let n=new Date(0);return n.setFullYear(e,t,r),n.setHours(0,0,0),n}function A(e,t){let r=Ye(e);if(x[r]??={},x[r][t])return x[r][t];let n="";switch(t){case"shortDate":n=k(e,p.Short);break;case"mediumDate":n=k(e,p.Medium);break;case"longDate":n=k(e,p.Long);break;case"fullDate":n=k(e,p.Full);break;case"shortTime":n=N(e,p.Short);break;case"mediumTime":n=N(e,p.Medium);break;case"longTime":n=N(e,p.Long);break;case"fullTime":n=N(e,p.Full);break;case"short":let i=A(e,"shortTime"),s=A(e,"shortDate");n=U($(e,p.Short),[i,s]);break;case"medium":let o=A(e,"mediumTime"),u=A(e,"mediumDate");n=U($(e,p.Medium),[o,u]);break;case"long":let g=A(e,"longTime"),_=A(e,"longDate");n=U($(e,p.Long),[g,_]);break;case"full":let E=A(e,"fullTime"),v=A(e,"fullDate");n=U($(e,p.Full),[E,v]);break}return n&&(x[r][t]=n),n}function U(e,t){return t&&(e=e.replace(/\{([^}]+)}/g,function(r,n){return t!=null&&n in t?t[n]:r})),e}function y(e,t,r="-",n,i){let s="";(e<0||i&&e<=0)&&(i?e=-e+1:(e=-e,s=r));let o=String(e);for(;o.length<t;)o="0"+o;return n&&(o=o.slice(o.length-t)),s+o}function nt(e,t){return y(e,3).substring(0,t)}function f(e,t,r=0,n=!1,i=!1){return function(s,o){let u=it(e,s);if((r>0||u>-r)&&(u+=r),e===c.Hours)u===0&&r===-12&&(u=12);else if(e===c.FractionalSeconds)return nt(u,t);let g=H(o,b.MinusSign);return y(u,t,g,n,i)}}function it(e,t){switch(e){case c.FullYear:return t.getFullYear();case c.Month:return t.getMonth();case c.Date:return t.getDate();case c.Hours:return t.getHours();case c.Minutes:return t.getMinutes();case c.Seconds:return t.getSeconds();case c.FractionalSeconds:return t.getMilliseconds();case c.Day:return t.getDay();default:throw new Error(`Unknown DateType value "${e}".`)}}function l(e,t,r=D.Format,n=!1){return function(i,s){return rt(i,s,e,t,r,n)}}function rt(e,t,r,n,i,s){switch(r){case a.Months:return Ke(t,i,n)[e.getMonth()];case a.Days:return Ze(t,i,n)[e.getDay()];case a.DayPeriods:let o=e.getHours(),u=e.getMinutes();if(s){let _=Xe(t),E=Qe(t,i,n),v=_.findIndex(O=>{if(Array.isArray(O)){let[Y,T]=O,ae=o>=Y.hours&&u>=Y.minutes,ce=o<T.hours||o===T.hours&&u<T.minutes;if(Y.hours<T.hours){if(ae&&ce)return!0}else if(ae||ce)return!0}else if(O.hours===o&&O.minutes===u)return!0;return!1});if(v!==-1)return E[v]}return We(t,i,n)[o<12?0:1];case a.Eras:return qe(t,n)[e.getFullYear()<=0?0:1];default:let g=r;throw new Error(`unexpected translation type ${g}`)}}function z(e){return function(t,r,n){let i=-1*n,s=H(r,b.MinusSign),o=i>0?Math.floor(i/60):Math.ceil(i/60);switch(e){case S.Short:return(i>=0?"+":"")+y(o,2,s)+y(Math.abs(i%60),2,s);case S.ShortGMT:return"GMT"+(i>=0?"+":"")+y(o,1,s);case S.Long:return"GMT"+(i>=0?"+":"")+y(o,2,s)+":"+y(Math.abs(i%60),2,s);case S.Extended:return n===0?"Z":(i>=0?"+":"")+y(o,2,s)+":"+y(Math.abs(i%60),2,s);default:throw new Error(`Unknown zone width "${e}"`)}}}var st=0,V=4;function ot(e){let t=G(e,st,1).getDay();return G(e,0,1+(t<=V?V:V+7)-t)}function Te(e){let t=e.getDay(),r=t===0?-3:V-t;return G(e.getFullYear(),e.getMonth(),e.getDate()+r)}function te(e,t=!1){return function(r,n){let i;if(t){let s=new Date(r.getFullYear(),r.getMonth(),1).getDay()-1,o=r.getDate();i=1+Math.floor((o+s)/7)}else{let s=Te(r),o=ot(s.getFullYear()),u=s.getTime()-o.getTime();i=1+Math.round(u/6048e5)}return y(i,e,H(n,b.MinusSign))}}function j(e,t=!1){return function(r,n){let s=Te(r).getFullYear();return y(s,e,H(n,b.MinusSign),t)}}var ne={};function ut(e){if(ne[e])return ne[e];let t;switch(e){case"G":case"GG":case"GGG":t=l(a.Eras,d.Abbreviated);break;case"GGGG":t=l(a.Eras,d.Wide);break;case"GGGGG":t=l(a.Eras,d.Narrow);break;case"y":t=f(c.FullYear,1,0,!1,!0);break;case"yy":t=f(c.FullYear,2,0,!0,!0);break;case"yyy":t=f(c.FullYear,3,0,!1,!0);break;case"yyyy":t=f(c.FullYear,4,0,!1,!0);break;case"Y":t=j(1);break;case"YY":t=j(2,!0);break;case"YYY":t=j(3);break;case"YYYY":t=j(4);break;case"M":case"L":t=f(c.Month,1,1);break;case"MM":case"LL":t=f(c.Month,2,1);break;case"MMM":t=l(a.Months,d.Abbreviated);break;case"MMMM":t=l(a.Months,d.Wide);break;case"MMMMM":t=l(a.Months,d.Narrow);break;case"LLL":t=l(a.Months,d.Abbreviated,D.Standalone);break;case"LLLL":t=l(a.Months,d.Wide,D.Standalone);break;case"LLLLL":t=l(a.Months,d.Narrow,D.Standalone);break;case"w":t=te(1);break;case"ww":t=te(2);break;case"W":t=te(1,!0);break;case"d":t=f(c.Date,1);break;case"dd":t=f(c.Date,2);break;case"c":case"cc":t=f(c.Day,1);break;case"ccc":t=l(a.Days,d.Abbreviated,D.Standalone);break;case"cccc":t=l(a.Days,d.Wide,D.Standalone);break;case"ccccc":t=l(a.Days,d.Narrow,D.Standalone);break;case"cccccc":t=l(a.Days,d.Short,D.Standalone);break;case"E":case"EE":case"EEE":t=l(a.Days,d.Abbreviated);break;case"EEEE":t=l(a.Days,d.Wide);break;case"EEEEE":t=l(a.Days,d.Narrow);break;case"EEEEEE":t=l(a.Days,d.Short);break;case"a":case"aa":case"aaa":t=l(a.DayPeriods,d.Abbreviated);break;case"aaaa":t=l(a.DayPeriods,d.Wide);break;case"aaaaa":t=l(a.DayPeriods,d.Narrow);break;case"b":case"bb":case"bbb":t=l(a.DayPeriods,d.Abbreviated,D.Standalone,!0);break;case"bbbb":t=l(a.DayPeriods,d.Wide,D.Standalone,!0);break;case"bbbbb":t=l(a.DayPeriods,d.Narrow,D.Standalone,!0);break;case"B":case"BB":case"BBB":t=l(a.DayPeriods,d.Abbreviated,D.Format,!0);break;case"BBBB":t=l(a.DayPeriods,d.Wide,D.Format,!0);break;case"BBBBB":t=l(a.DayPeriods,d.Narrow,D.Format,!0);break;case"h":t=f(c.Hours,1,-12);break;case"hh":t=f(c.Hours,2,-12);break;case"H":t=f(c.Hours,1);break;case"HH":t=f(c.Hours,2);break;case"m":t=f(c.Minutes,1);break;case"mm":t=f(c.Minutes,2);break;case"s":t=f(c.Seconds,1);break;case"ss":t=f(c.Seconds,2);break;case"S":t=f(c.FractionalSeconds,1);break;case"SS":t=f(c.FractionalSeconds,2);break;case"SSS":t=f(c.FractionalSeconds,3);break;case"Z":case"ZZ":case"ZZZ":t=z(S.Short);break;case"ZZZZZ":t=z(S.Extended);break;case"O":case"OO":case"OOO":case"z":case"zz":case"zzz":t=z(S.ShortGMT);break;case"OOOO":case"ZZZZ":case"zzzz":t=z(S.Long);break;default:return null}return ne[e]=t,t}function Pe(e,t){e=e.replace(/:/g,"");let r=Date.parse("Jan 01, 1970 00:00:00 "+e)/6e4;return isNaN(r)?t:r}function at(e,t){return e=new Date(e.getTime()),e.setMinutes(e.getMinutes()+t),e}function ct(e,t,r){let n=r?-1:1,i=e.getTimezoneOffset(),s=Pe(t,i);return at(e,n*(s-i))}function dt(e){if(_e(e))return e;if(typeof e=="number"&&!isNaN(e))return new Date(e);if(typeof e=="string"){if(e=e.trim(),/^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(e)){let[i,s=1,o=1]=e.split("-").map(u=>+u);return G(i,s-1,o)}let r=parseFloat(e);if(!isNaN(e-r))return new Date(r);let n;if(n=e.match(Je))return lt(n)}let t=new Date(e);if(!_e(t))throw new Error(`Unable to convert "${e}" into a date`);return t}function lt(e){let t=new Date(0),r=0,n=0,i=e[8]?t.setUTCFullYear:t.setFullYear,s=e[8]?t.setUTCHours:t.setHours;e[9]&&(r=Number(e[9]+e[10]),n=Number(e[9]+e[11])),i.call(t,Number(e[1]),Number(e[2])-1,Number(e[3]));let o=Number(e[4]||0)-r,u=Number(e[5]||0)-n,g=Number(e[6]||0),_=Math.floor(parseFloat("0."+(e[7]||0))*1e3);return s.call(t,o,u,g,_),t}function _e(e){return e instanceof Date&&!isNaN(e.valueOf())}function tn(e,t,r){return Fe(e,t,r)}function nn(e,t){t=encodeURIComponent(t);for(let r of e.split(";")){let n=r.indexOf("="),[i,s]=n==-1?[r,""]:[r.slice(0,n),r.slice(n+1)];if(i.trim()===t)return decodeURIComponent(s)}return null}var ie=/\s+/,be=[],rn=(()=>{let t=class t{constructor(n,i){this._ngEl=n,this._renderer=i,this.initialClasses=be,this.stateMap=new Map}set klass(n){this.initialClasses=n!=null?n.trim().split(ie):be}set ngClass(n){this.rawClass=typeof n=="string"?n.trim().split(ie):n}ngDoCheck(){for(let i of this.initialClasses)this._updateState(i,!0);let n=this.rawClass;if(Array.isArray(n)||n instanceof Set)for(let i of n)this._updateState(i,!0);else if(n!=null)for(let i of Object.keys(n))this._updateState(i,!!n[i]);this._applyStateDiff()}_updateState(n,i){let s=this.stateMap.get(n);s!==void 0?(s.enabled!==i&&(s.changed=!0,s.enabled=i),s.touched=!0):this.stateMap.set(n,{enabled:i,changed:!0,touched:!0})}_applyStateDiff(){for(let n of this.stateMap){let i=n[0],s=n[1];s.changed?(this._toggleClass(i,s.enabled),s.changed=!1):s.touched||(s.enabled&&this._toggleClass(i,!1),this.stateMap.delete(i)),s.touched=!1}}_toggleClass(n,i){n=n.trim(),n.length>0&&n.split(ie).forEach(s=>{i?this._renderer.addClass(this._ngEl.nativeElement,s):this._renderer.removeClass(this._ngEl.nativeElement,s)})}};t.\u0275fac=function(i){return new(i||t)(w(Z),w(K))},t.\u0275dir=P({type:t,selectors:[["","ngClass",""]],inputs:{klass:[fe.None,"class","klass"],ngClass:"ngClass"},standalone:!0});let e=t;return e})();var sn=(()=>{let t=class t{constructor(n,i){this._viewContainer=n,this._context=new re,this._thenTemplateRef=null,this._elseTemplateRef=null,this._thenViewRef=null,this._elseViewRef=null,this._thenTemplateRef=i}set ngIf(n){this._context.$implicit=this._context.ngIf=n,this._updateView()}set ngIfThen(n){ve("ngIfThen",n),this._thenTemplateRef=n,this._thenViewRef=null,this._updateView()}set ngIfElse(n){ve("ngIfElse",n),this._elseTemplateRef=n,this._elseViewRef=null,this._updateView()}_updateView(){this._context.$implicit?this._thenViewRef||(this._viewContainer.clear(),this._elseViewRef=null,this._thenTemplateRef&&(this._thenViewRef=this._viewContainer.createEmbeddedView(this._thenTemplateRef,this._context))):this._elseViewRef||(this._viewContainer.clear(),this._thenViewRef=null,this._elseTemplateRef&&(this._elseViewRef=this._viewContainer.createEmbeddedView(this._elseTemplateRef,this._context)))}static ngTemplateContextGuard(n,i){return!0}};t.\u0275fac=function(i){return new(i||t)(w(q),w(me))},t.\u0275dir=P({type:t,selectors:[["","ngIf",""]],inputs:{ngIf:"ngIf",ngIfThen:"ngIfThen",ngIfElse:"ngIfElse"},standalone:!0});let e=t;return e})(),re=class{constructor(){this.$implicit=null,this.ngIf=null}};function ve(e,t){if(!!!(!t||t.createEmbeddedView))throw new Error(`${e} must be a TemplateRef, but received '${le(t)}'.`)}var on=(()=>{let t=class t{constructor(n){this._viewContainerRef=n,this._viewRef=null,this.ngTemplateOutletContext=null,this.ngTemplateOutlet=null,this.ngTemplateOutletInjector=null}ngOnChanges(n){if(this._shouldRecreateView(n)){let i=this._viewContainerRef;if(this._viewRef&&i.remove(i.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let s=this._createContextForwardProxy();this._viewRef=i.createEmbeddedView(this.ngTemplateOutlet,s,{injector:this.ngTemplateOutletInjector??void 0})}}_shouldRecreateView(n){return!!n.ngTemplateOutlet||!!n.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(n,i,s)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,i,s):!1,get:(n,i,s)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,i,s)}})}};t.\u0275fac=function(i){return new(i||t)(w(q))},t.\u0275dir=P({type:t,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},standalone:!0,features:[ge]});let e=t;return e})();function ke(e,t){return new de(2100,!1)}var se=class{createSubscription(t,r){return Q(()=>t.subscribe({next:r,error:n=>{throw n}}))}dispose(t){Q(()=>t.unsubscribe())}},oe=class{createSubscription(t,r){return t.then(r,n=>{throw n})}dispose(t){}},ht=new oe,ft=new se,un=(()=>{let t=class t{constructor(n){this._latestValue=null,this.markForCheckOnValueUpdate=!0,this._subscription=null,this._obj=null,this._strategy=null,this._ref=n}ngOnDestroy(){this._subscription&&this._dispose(),this._ref=null}transform(n){if(!this._obj){if(n)try{this.markForCheckOnValueUpdate=!1,this._subscribe(n)}finally{this.markForCheckOnValueUpdate=!0}return this._latestValue}return n!==this._obj?(this._dispose(),this.transform(n)):this._latestValue}_subscribe(n){this._obj=n,this._strategy=this._selectStrategy(n),this._subscription=this._strategy.createSubscription(n,i=>this._updateLatestValue(n,i))}_selectStrategy(n){if(ye(n))return ht;if(Ce(n))return ft;throw ke(t,n)}_dispose(){this._strategy.dispose(this._subscription),this._latestValue=null,this._subscription=null,this._obj=null}_updateLatestValue(n,i){n===this._obj&&(this._latestValue=i,this.markForCheckOnValueUpdate&&this._ref?.markForCheck())}};t.\u0275fac=function(i){return new(i||t)(w(X,16))},t.\u0275pipe=W({name:"async",type:t,pure:!1,standalone:!0});let e=t;return e})();var Dt="mediumDate",gt=new R(""),pt=new R(""),an=(()=>{let t=class t{constructor(n,i,s){this.locale=n,this.defaultTimezone=i,this.defaultOptions=s}transform(n,i,s,o){if(n==null||n===""||n!==n)return null;try{let u=i??this.defaultOptions?.dateFormat??Dt,g=s??this.defaultOptions?.timezone??this.defaultTimezone??void 0;return tt(n,u,o||this.locale,g)}catch(u){throw ke(t,u.message)}}};t.\u0275fac=function(i){return new(i||t)(w(Ee,16),w(gt,24),w(pt,24))},t.\u0275pipe=W({name:"date",type:t,pure:!0,standalone:!0});let e=t;return e})();var cn=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=De({type:t}),t.\u0275inj=he({});let e=t;return e})(),mt="browser",Ft="server";function dn(e){return e===mt}function ln(e){return e===Ft}var Ie=class{};var C=function(e){return e[e.State=0]="State",e[e.Transition=1]="Transition",e[e.Sequence=2]="Sequence",e[e.Group=3]="Group",e[e.Animate=4]="Animate",e[e.Keyframes=5]="Keyframes",e[e.Style=6]="Style",e[e.Trigger=7]="Trigger",e[e.Reference=8]="Reference",e[e.AnimateChild=9]="AnimateChild",e[e.AnimateRef=10]="AnimateRef",e[e.Query=11]="Query",e[e.Stagger=12]="Stagger",e}(C||{}),Dn="*";function gn(e,t){return{type:C.Trigger,name:e,definitions:t,options:{}}}function pn(e,t=null){return{type:C.Animate,styles:t,timings:e}}function mn(e,t=null){return{type:C.Group,steps:e,options:t}}function Fn(e,t=null){return{type:C.Sequence,steps:e,options:t}}function yn(e){return{type:C.Style,styles:e,offset:null}}function Cn(e,t,r){return{type:C.State,name:e,styles:t,options:r}}function En(e){return{type:C.Keyframes,steps:e}}function wn(e,t,r=null){return{type:C.Transition,expr:e,animation:t,options:r}}function An(e=null){return{type:C.AnimateChild,options:e}}function Sn(e,t,r=null){return{type:C.Query,selector:e,animation:t,options:r}}var Ne=class{constructor(t=0,r=0){this._onDoneFns=[],this._onStartFns=[],this._onDestroyFns=[],this._originalOnDoneFns=[],this._originalOnStartFns=[],this._started=!1,this._destroyed=!1,this._finished=!1,this._position=0,this.parentPlayer=null,this.totalTime=t+r}_onFinish(){this._finished||(this._finished=!0,this._onDoneFns.forEach(t=>t()),this._onDoneFns=[])}onStart(t){this._originalOnStartFns.push(t),this._onStartFns.push(t)}onDone(t){this._originalOnDoneFns.push(t),this._onDoneFns.push(t)}onDestroy(t){this._onDestroyFns.push(t)}hasStarted(){return this._started}init(){}play(){this.hasStarted()||(this._onStart(),this.triggerMicrotask()),this._started=!0}triggerMicrotask(){queueMicrotask(()=>this._onFinish())}_onStart(){this._onStartFns.forEach(t=>t()),this._onStartFns=[]}pause(){}restart(){}finish(){this._onFinish()}destroy(){this._destroyed||(this._destroyed=!0,this.hasStarted()||this._onStart(),this.finish(),this._onDestroyFns.forEach(t=>t()),this._onDestroyFns=[])}reset(){this._started=!1,this._finished=!1,this._onStartFns=this._originalOnStartFns,this._onDoneFns=this._originalOnDoneFns}setPosition(t){this._position=this.totalTime?t*this.totalTime:1}getPosition(){return this.totalTime?this._position/this.totalTime:1}triggerCallback(t){let r=t=="start"?this._onStartFns:this._onDoneFns;r.forEach(n=>n()),r.length=0}},$e=class{constructor(t){this._onDoneFns=[],this._onStartFns=[],this._finished=!1,this._started=!1,this._destroyed=!1,this._onDestroyFns=[],this.parentPlayer=null,this.totalTime=0,this.players=t;let r=0,n=0,i=0,s=this.players.length;s==0?queueMicrotask(()=>this._onFinish()):this.players.forEach(o=>{o.onDone(()=>{++r==s&&this._onFinish()}),o.onDestroy(()=>{++n==s&&this._onDestroy()}),o.onStart(()=>{++i==s&&this._onStart()})}),this.totalTime=this.players.reduce((o,u)=>Math.max(o,u.totalTime),0)}_onFinish(){this._finished||(this._finished=!0,this._onDoneFns.forEach(t=>t()),this._onDoneFns=[])}init(){this.players.forEach(t=>t.init())}onStart(t){this._onStartFns.push(t)}_onStart(){this.hasStarted()||(this._started=!0,this._onStartFns.forEach(t=>t()),this._onStartFns=[])}onDone(t){this._onDoneFns.push(t)}onDestroy(t){this._onDestroyFns.push(t)}hasStarted(){return this._started}play(){this.parentPlayer||this.init(),this._onStart(),this.players.forEach(t=>t.play())}pause(){this.players.forEach(t=>t.pause())}restart(){this.players.forEach(t=>t.restart())}finish(){this._onFinish(),this.players.forEach(t=>t.finish())}destroy(){this._onDestroy()}_onDestroy(){this._destroyed||(this._destroyed=!0,this._onFinish(),this.players.forEach(t=>t.destroy()),this._onDestroyFns.forEach(t=>t()),this._onDestroyFns=[])}reset(){this.players.forEach(t=>t.reset()),this._destroyed=!1,this._finished=!1,this._started=!1}setPosition(t){let r=t*this.totalTime;this.players.forEach(n=>{let i=n.totalTime?Math.min(1,r/n.totalTime):1;n.setPosition(i)})}getPosition(){let t=this.players.reduce((r,n)=>r===null||n.totalTime>r.totalTime?n:r,null);return t!=null?t.getPosition():0}beforeDestroy(){this.players.forEach(t=>{t.beforeDestroy&&t.beforeDestroy()})}triggerCallback(t){let r=t=="start"?this._onStartFns:this._onDoneFns;r.forEach(n=>n()),r.length=0}},_n="!";export{J as a,en as b,we as c,Le as d,ue as e,je as f,tn as g,nn as h,rn as i,sn as j,on as k,un as l,pt as m,an as n,cn as o,mt as p,dn as q,ln as r,Ie as s,C as t,Dn as u,gn as v,pn as w,mn as x,Fn as y,yn as z,Cn as A,En as B,wn as C,An as D,Sn as E,Ne as F,$e as G,_n as H};
