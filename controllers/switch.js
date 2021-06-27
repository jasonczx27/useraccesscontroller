
require("./features")()

module.exports = {
    switch: async function (data) {
        const { featureName = null } = data

        return new Promise((resolve, reject) => {
            try {

                var fn = eval(`var f = function(){return ${featureName};} ; f();`);
                controller(data, fn).then(
                    result => {
                        resolve(result)
                        return
                    }

                ).catch(result => {
                    reject(result)
                    return
                })
            }
            catch (e) {
                console.log("switch exception encountered ", e)
                // console.log("Error:\n", e)
                // res.status(200).json(e);
                reject(false)
            }
        })
    }
}

async function controller(data, callback) {
    if (callback && typeof callback === "function") {
        var result = await callback(data);
        // console.log("caresultlresult", JSON.stringify(result));
        return result;
    } else {
        console.log(`Callback Function NOT exist, ${typeof callback}`)
        // console.log(error);
        return false;
    }
}