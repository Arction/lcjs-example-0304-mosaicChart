(self.webpackChunk=self.webpackChunk||[]).push([[524],{44:(e,t,s)=>{const a=s(89),{lightningChart:r,SolidFill:o,ColorRGBA:l,emptyLine:i,emptyFill:u,UIElementBuilders:n,UIBackgrounds:d,UIOrigins:y,AxisTickStrategies:g,Themes:C}=a,c=r();let S;S=()=>{const e=c.ChartXY({}).setTitle("Controlled Group Testing").setMouseInteractions(!1).setAutoCursorMode(0),t=e.addRectangleSeries(),s=e.getDefaultAxisX().setInterval({start:0,end:100,stopAxisAfter:!1}).setScrollStrategy(void 0).setMouseInteractions(!1).setTitle("%"),a=e.getDefaultAxisY().setInterval({start:0,end:100,stopAxisAfter:!1}).setMouseInteractions(!1).setTickStrategy(g.Empty),r=e.addAxisY({opposite:!0}).setInterval({start:0,end:100,stopAxisAfter:!1}).setScrollStrategy(void 0).setMouseInteractions(!1).setTitle("%"),d=e.addAxisX({opposite:!0}).setInterval({start:0,end:100,stopAxisAfter:!1}).setMouseInteractions(!1).setTickStrategy(g.Empty),S=n.AxisTickMajor,b=n.TextBox.addStyler((e=>e.setOrigin(y.Center).setTextFillStyle((new o).setColor(l(255,255,255))).setMouseInteractions(!1).setBackground((e=>e.setFillStyle(u).setStrokeStyle(i))))),f=[],h=[],k=[];const V=()=>{t.clear();const e=f.reduce(((e,t)=>e+t.value),0);if(e>0){let s=0;for(const e of h)e.tick.setTextFormatter((t=>e.name)).setValue(e.value).setMarkerVisible(!0);for(const a of f){const r=100*a.value/e,o=a.subCategories.reduce(((e,t)=>e+t.value),0);if(o>0){a.tick.setTextFormatter((e=>a.name+" ("+Math.round(r)+"%)")).setValue(s+r/2).setMarkerVisible(!0);let e=0;for(const l of a.subCategories){const a=100*l.value/o;if(a>0){const o={x:s+.1,y:e+.1,width:r-.2,height:a-.2};t.add(o).setFillStyle(l.subCategory.fillStyle).setStrokeStyle(i),l.label.setText(Math.round(a)+"%").setPosition({x:s+r/2,y:e+a/2}).setVisible(!0)}else l.label.setVisible(!1);e+=a}}else a.tick.setMarkerVisible(!1),a.subCategories.forEach((e=>e.label.setVisible(!1)));s+=r}}};return{addSubCategory:()=>{const e={fillStyle:C.darkGold.seriesFillStyle,setFillStyle(e){return this.fillStyle=e,V(),this}};return k.push(e),e},addCategory:t=>{const a={name:t,value:0,tick:d.addCustomTick(S).setGridStrokeStyle(i),subCategories:[],setCategoryValue(e){return this.value=e,V(),this},setSubCategoryValue(t,a){const o=this.subCategories.find((e=>e.subCategory==t));return void 0!==o?o.value=a:this.subCategories.push({subCategory:t,value:a,label:e.addUIElement(b,{x:s,y:r})}),V(),this}};return f.push(a),a},addYCategory:(e,t)=>{const s={name:e,value:t,tick:a.addCustomTick(S).setGridStrokeStyle(i),setCategoryYValue(e){return this.value=e,V(),this}};return h.push(s),s}}};const b=S();b.addYCategory("Refreshed",80),b.addYCategory("No Effect",40),b.addYCategory("Caused Exhaustion",12);const f=b.addSubCategory().setFillStyle((new o).setColor(l(200,0,0))),h=b.addSubCategory().setFillStyle((new o).setColor(l(240,190,0))),k=b.addSubCategory().setFillStyle((new o).setColor(l(0,180,0)));b.addCategory("With caffeine").setCategoryValue(48).setSubCategoryValue(f,25).setSubCategoryValue(h,35).setSubCategoryValue(k,40),b.addCategory("Decaffeinated").setCategoryValue(32).setSubCategoryValue(f,10).setSubCategoryValue(h,45).setSubCategoryValue(k,45),b.addCategory("Placebo product").setCategoryValue(20).setSubCategoryValue(f,20).setSubCategoryValue(h,50).setSubCategoryValue(k,30)}},e=>{e.O(0,[502],(()=>(44,e(e.s=44)))),e.O()}]);