const dataKeys = ['body' , 'params', 'headers' , 'query'] 

export const  validation = (schema)=>{
    return (req , res,next)=>{
        const validationArr =[]
        for (const key of dataKeys) {
            if (schema[key]) {
                const validationResult = schema[key].validate(req[key] , {abortEarly:false})
                console.log(validationResult);
                if (validationResult?.error) {
                    validationArr.push(validationResult?.error.details)
                    console.log(validationArr);
                    if (validationArr.length) {
                        res.status(400).json({message:"validation error" , validationArr})
                    }
                } else {
                    next()
                }
                
            }

        }
    }
}