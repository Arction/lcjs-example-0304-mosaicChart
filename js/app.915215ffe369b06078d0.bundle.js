(self.webpackChunk=self.webpackChunk||[]).push([[524],{44:(e,t,s)=>{const a=s(377),{lightningChart:r,SolidFill:l,ColorRGBA:o,emptyLine:i,emptyFill:u,UIElementBuilders:d,UIBackgrounds:n,UIOrigins:y,AxisTickStrategies:g,Themes:c}=a,C=r({resourcesBaseUrl:new URL(document.head.baseURI).origin+new URL(document.head.baseURI).pathname+"resources/"});let S;S=()=>{const e=C.ChartXY({theme:c[new URLSearchParams(window.location.search).get("theme")||"darkGold"]||void 0}).setTitle("Controlled Group Testing").setUserInteractions(void 0).setCursorMode(void 0),t=e.addRectangleSeries(),s=e.getDefaultAxisX().setInterval({start:0,end:100,stopAxisAfter:!1}).setScrollStrategy(void 0).setTitle("%"),a=e.getDefaultAxisY().setInterval({start:0,end:100,stopAxisAfter:!1}).setTickStrategy(g.Empty),r=e.addAxisY({opposite:!0}).setInterval({start:0,end:100,stopAxisAfter:!1}).setScrollStrategy(void 0).setTitle("%"),n=e.addAxisX({opposite:!0}).setInterval({start:0,end:100,stopAxisAfter:!1}).setTickStrategy(g.Empty),S=d.AxisTickMajor,b=d.TextBox.addStyler((e=>e.setOrigin(y.Center).setTextFillStyle((new l).setColor(o(255,255,255))).setPointerEvents(!1).setBackground((e=>e.setFillStyle(u).setStrokeStyle(i))))),h=[],f=[],k=[];const V=()=>{t.clear();const e=h.reduce(((e,t)=>e+t.value),0);if(e>0){let s=0;for(const e of f)e.tick.setTextFormatter((t=>e.name)).setValue(e.value).setMarkerVisible(!0);for(const a of h){const r=100*a.value/e,l=a.subCategories.reduce(((e,t)=>e+t.value),0);if(l>0){a.tick.setTextFormatter((e=>a.name+" ("+Math.round(r)+"%)")).setValue(s+r/2).setMarkerVisible(!0);let e=0;for(const o of a.subCategories){const a=100*o.value/l;if(a>0){const l={x:s+.1,y:e+.1,width:r-.2,height:a-.2};t.add(l).setFillStyle(o.subCategory.fillStyle).setStrokeStyle(i),o.label.setText(Math.round(a)+"%").setPosition({x:s+r/2,y:e+a/2}).setVisible(!0)}else o.label.setVisible(!1);e+=a}}else a.tick.setMarkerVisible(!1),a.subCategories.forEach((e=>e.label.setVisible(!1)));s+=r}}};return{addSubCategory:()=>{const e={fillStyle:c.darkGold.seriesFillStyle,setFillStyle(e){return this.fillStyle=e,V(),this}};return k.push(e),e},addCategory:t=>{const a={name:t,value:0,tick:n.addCustomTick(S).setGridStrokeStyle(i),subCategories:[],setCategoryValue(e){return this.value=e,V(),this},setSubCategoryValue(t,a){const l=this.subCategories.find((e=>e.subCategory==t));return void 0!==l?l.value=a:this.subCategories.push({subCategory:t,value:a,label:e.addUIElement(b,{x:s,y:r})}),V(),this}};return h.push(a),a},addYCategory:(e,t)=>{const s={name:e,value:t,tick:a.addCustomTick(S).setGridStrokeStyle(i),setCategoryYValue(e){return this.value=e,V(),this}};return f.push(s),s}}};const b=S();b.addYCategory("Refreshed",80),b.addYCategory("No Effect",40),b.addYCategory("Caused Exhaustion",12);const h=b.addSubCategory().setFillStyle((new l).setColor(o(200,0,0))),f=b.addSubCategory().setFillStyle((new l).setColor(o(240,190,0))),k=b.addSubCategory().setFillStyle((new l).setColor(o(0,180,0)));b.addCategory("With caffeine").setCategoryValue(48).setSubCategoryValue(h,25).setSubCategoryValue(f,35).setSubCategoryValue(k,40),b.addCategory("Decaffeinated").setCategoryValue(32).setSubCategoryValue(h,10).setSubCategoryValue(f,45).setSubCategoryValue(k,45),b.addCategory("Placebo product").setCategoryValue(20).setSubCategoryValue(h,20).setSubCategoryValue(f,50).setSubCategoryValue(k,30)}},e=>{e.O(0,[502],(()=>e(e.s=44))),e.O()}]);