const mixMethods = {
    methods: {
        showInfo(){
            alert(this.name);
        }
    },
    mounted() {
        console.log("mounted调用");
    }
}

const myData = {
    data(){
        return {
            x: 100,
            y: 150,
            z: 200
        }
    }
}

export {mixMethods,myData};