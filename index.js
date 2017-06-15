
//重构-----组件化

var img = {
    data:function(){
        return {
            categoryClass:'textAll',
            text:'text',
            leftMessage:"FE",
            topMessage:"BE",
            rightMessage:"DESIGN",
            bottomMessage:"利器",

            imgClass:'left',
            myTextClass:'leftText'
        }
    },
    template: '<div id="left" :class="[imgClass]"> <p  :class="[categoryClass,myTextClass,text]" >{{ leftMessage }}</p> </div> ' +
    '<div id="top" :class="[imgClass]"> <p  :class="[categoryClass,myTextClass,text]" >{{ topMessage  }}</p> </div> ' +
    '<div id="right" :class="[imgClass]"> <p  :class="[categoryClass,myTextClass,text]" >{{ rightMessage }}</p> </div> ' +
    '<div id="bottom" :class="[imgClass]"> <p  :class="[categoryClass,myTextClass,text]" >{{ bottomMessage }}</p> </div>'
};

Vue.component('imgPhoto',img);

new Vue({
    el:"#test"
})


//重构-----组件化


//var leftImage = new Vue ({
//    el:"#left",
//    data: {
//        imgClass:'left',
//        categoryClass:'textAll',
//        myTextClass:'leftText',
//        text:'text',
//        message: "前端"
//    }
//});
//
//
//var topImage = new Vue ({
//    el:"#top",
//    data: {
//        imgClass:'top',
//        categoryClass:'textAll',
//        myTextClass:'topText',
//        text:'text',
//        message: "HTML"
//    }
//});
//
//var rightImage = new Vue ({
//    el:"#right",
//    data: {
//        imgClass:'right',
//        categoryClass:'textAll',
//        myTextClass:'rightText',
//        text:'text',
//        message: "CSS"
//    }
//});
//
//var bottomImage = new Vue ({
//    el:"#bottom",
//    data: {
//        imgClass:'bottom',
//        categoryClass:'textAll',
//        myTextClass:'bottomText',
//        text:'text',
//        message: "JavaScript"
//    }
//});