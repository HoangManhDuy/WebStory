var manage_drink = new Vue	({
    el:'#manage_drink',
    data : {
        drinks:[],
        item_drink:{'name':'','price':'','description':'',},
        new_drink:{'name':'','price':'','description':'','category':'',},
    },
    computed: {
    },
    mounted :function(){
        // this.show_drink();
    },
    methods: {
        show_drink :function(){
            var authOptions = {
                method: 'get',
                url: '/api/v1/all_drinks',
                json: true,
            }
            axios(authOptions).then(response => {
                this.$set(this, 'drinks', response.data);
            console.log(response.data);
        });
        },
        confirm_delete: function(drink){
            $('#delete_drink_confirm').modal('show');
            this.item_drink = drink;
        },
        delete_drink:function(id){
            console.log(id);
            var authOptions = {
                method: 'get',
                url: '/api/v1/delete_drink/'+ id,
                json: true,
            }
            axios(authOptions).then(response => {
                toastr.success('Delete drink success', 'Success', {timeOut: 1000});
        }).catch((error) => {
                toastr.error('Delete drink error', 'Error', {timeOut: 1000});
        });
            this.show_drink();
        },
        edit_drink : function(drink) {
            $('#show_edit_drink').modal('show');
            this.item_drink = drink;
        },
        edit : function(id){
            var authOptions = {
                method: 'post',
                url: '../api/v1/update_drink/'+ id,
                params: this.item_drink,
                json: true,
            }
            axios(authOptions).then(response => {
                toastr.success('Edit drink success', 'Success', {timeOut: 1000});
        }).catch((error) => {
                toastr.error('Edit drink error', 'Error', {timeOut: 1000});
        });
            this.show_drink;
        },
        show_create : function(){
            $('#show_create').modal('show');
        },
        create_drink : function(){
            var input = this.new_drink;
            console.log(input);
            var authOptions = {
                method: 'post',
                url: '/api/v1/create_drink',
                params: input,
                json: true
            }

            axios(authOptions).then((response) => {
                this.new_drink ={'name':'','price':'','describle':'','category':'',};
            toastr.success('Add drink success', 'Success', {timeOut: 1000});
        }).catch((error) => {
                console.log(error);
                toastr.error('Add drink error', 'Error', {timeOut: 1000});
        });
            // console.log('hihi')
        },


    }

})
