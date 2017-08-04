function MVVM(param){

    var observer = {
        el: '',
        data: null,
        init: function(param){

            this.data = param.data;
            this.el = document.getElementById(param.id);

            this.model = this.el.querySelectorAll('[v-model]');

            this.listen();
            this.data = this.definePro(param.data);
            this.render();

            return Object.create(this);
        },

        render: function(){
            var data = this.data;

            this.model.forEach(function(v){
                var key = v.getAttribute('v-model');
                v.innerHTML = data[key];
                v.value = data[key];
            });
        },

        update: function(key){
            var data = this.data;

            this.model.forEach(function(v){
                var key = v.getAttribute('v-model');
                v.innerHTML = data[key];
                v.value = data[key];
            });
        },

        listen: function(){
            var data = this.data;

            for(var key in data){

                this.model.forEach(function(v){
                    if(v.tagName.toUpperCase() == 'INPUT'){
                        v.addEventListener('keyup', function(e){
                            data[key] = e.target.value;
                        })
                        
                    }
                })
            }
        },

        definePro: function(obj){
            var me = this;
            var newobj = {};

            for(var key in obj){
                newobj[key] = obj[key];

                if( !obj.hasOwnProperty(key) ){
                    continue;
                }

                Object.defineProperty(obj, key, {
                    get: function(){
                        return newobj[key];
                    },
                    set: function(value){
                        
                        newobj[key] = value;
                        // 更改数据时
                        me.update(key);

                    }
                });
            }

            return newobj;
        }
    }


    return observer.init(param);
}


var data = {
    message: 'heke'
}

var app = new MVVM({
    id: 'content',
    data: data
});

// var newdata = definePro(data);