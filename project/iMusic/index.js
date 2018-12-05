var EventCenter = {
    on: function(type, handler){
        $(document).on(type, handler)
    },
    fire: function(type, data){
        $(document).trigger(type,data);
    }
}

EventCenter.on('hello',function (e,data) {
    console.log(data);
});
EventCenter.fire('hello','123');