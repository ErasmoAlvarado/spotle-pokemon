function checkLimit(value1,value2){
    if(value1-value2 < 0){
        return 0
    }
    return value1-value2
}

export function setVariable(data, compare, value) {
    if(data == compare ){
        return "largeCard correct"
    }
    if(data < compare && data > checkLimit(compare,value)){
        return "largeCard close"
    }
    else if(data > compare && data < compare+value){
        return "largeCard close"
    }
    return "largeCard"
}
