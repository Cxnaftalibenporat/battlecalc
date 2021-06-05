module.exports = {

    Output : "",
    Flag : true,

    log(input) {
        if (this.Flag == true) {
            return;
        }
        this.Output += input;
        this.Output += "\n"
    },
    getLog(){
        return this.Output;
    }
};