webpackJsonp([64],{JuJ3:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("eMYz"),n=s("Z1y9"),r={name:"personnelInfo",components:{headerLast:a.a},data:function(){return{personnelTit:"人员信息",USERID:this.$route.query.USERID,email:this.$route.query.email,userRole:this.$route.query.userRole,userName:this.$route.query.userName,userPhone:this.$route.query.userPhone,positionName:this.$route.query.positionName,personnelData:{},personnelSupportData:{}}},created:function(){var e=this;void 0==this.userRole?n.a.get("?action=/once/QueryUserInfo&USERID="+this.USERID,{}).then(function(t){e.personnelData=t.data,e.personnelData.positionName=e.positionName}):void 0!=this.userRole&&(this.personnelSupportData.userRole=this.userRole,this.personnelSupportData.userName=this.userName,this.personnelSupportData.userPhone=this.userPhone,this.personnelSupportData.email=this.email)}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"personnelView"},[a("header-last",{attrs:{title:e.personnelTit}}),e._v(" "),a("div",{staticStyle:{height:"0.45rem"}}),e._v(" "),a("div",{staticClass:"content"}),e._v(" "),void 0==e.userRole?a("div",{ref:"personnelData",staticClass:"personForm",attrs:{data:e.personnelData}},[a("div",{staticClass:"cellLeft"},[e.personnelData.imgSrc?a("img",{attrs:{src:e.personnelData.imgSrc,alt:""}}):a("img",{attrs:{src:s("gDh6"),alt:""}})]),e._v(" "),a("div",{staticClass:"cellRight"},[a("p",[e._v(e._s(e.personnelData.realname))]),e._v(" "),a("ul",[a("li",[a("span",[e._v("邮箱：")]),e._v(e._s(e.personnelData.oemail))]),e._v(" "),a("li",[a("span",[e._v("手机：")]),a("a",{staticStyle:{color:"#2698d6"},attrs:{href:"tel:"+e.personnelData.mobileno},on:{click:function(t){e.sendCall(e.personnelData.mobileno)}}},[e._v(e._s(e.personnelData.mobileno))])]),e._v(" "),a("li",[a("span",[e._v("参与角色：")]),e._v(e._s(e.personnelData.positionName))])])])]):e._e(),e._v(" "),void 0!=e.userRole?a("div",{ref:"personnelSupportData",staticClass:"personForm",attrs:{data:e.personnelSupportData}},[a("div",{staticClass:"cellLeft"},[e.personnelSupportData.imgSrc?a("img",{attrs:{src:e.personnelSupportData.imgSrc,alt:""}}):a("img",{attrs:{src:s("gDh6"),alt:""}})]),e._v(" "),a("div",{staticClass:"cellRight"},[a("p",[e._v(e._s(e.personnelSupportData.userName))]),e._v(" "),a("ul",[a("li",[a("span",[e._v("邮箱：")]),e._v(e._s(e.personnelSupportData.email))]),e._v(" "),a("li",[a("span",[e._v("手机：")]),a("a",{staticStyle:{color:"#2698d6"},attrs:{href:"tel:"+e.personnelSupportData.userPhone},on:{click:function(t){e.sendCall(e.personnelSupportData.userPhone)}}},[e._v(e._s(e.personnelSupportData.userPhone))])]),e._v(" "),a("li",[a("span",[e._v("参与角色：")]),e._v(e._s(e.personnelSupportData.userRole))])])])]):e._e()],1)},staticRenderFns:[]};var l=s("VU/8")(r,o,!1,function(e){s("SnP6")},"data-v-46c19448",null);t.default=l.exports},SnP6:function(e,t){}});