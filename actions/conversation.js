/**                                                                                                                                   
 * Calls the Conversation service and returns a conversation context.                                                                 
 * @param {Object} params The parameters                                                                                              
 * @param {String} params.CONVERSATION_USERNAME The username for the Conversation service.                                            
 * @param {String} params.CONVERSATION_PASSWORD The password for the Conversation service.                                            
 */
console.log('starting conversation');
function main(params) {
    console.log('calling conversation');

    return new Promise(function(resolve, reject) {
        var watson = require('watson-developer-cloud');
        var USERNAME = params.CONVERSATION_USERNAME;
        var PASSWORD = params.CONVERSATION_PASSWORD;
        var WORKSPACE_ID = params.WORKSPACE_ID;

        var conversation = watson.conversation({
            username: USERNAME,
            password: PASSWORD,
            version: 'v1',
            version_date: '2017-05-26'
        });

        var city_name = params.conversation.context.city.name;
        console.log(city_name);

        var context = (params.conversation && params.conversation.context ? params.conversation.context : {});

        if (!context.date) {
            var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var date = new Date();
            console.log(date);
            var today = daysOfWeek[date.getDay()];
            context.date = today;
            context.today = today;
            console.log(today);
            // var tomorrow = daysOfWeek[date.getDay()+1];
            // context.tomorrow = tomorrow;
            console.log('added date');
        }

        console.log('CONTEXT');
        console.log(context);
        
        conversation.message({
            workspace_id: WORKSPACE_ID,
            input: params.conversation.input,
            context: context
        }, function(err, response) {
                if (err) {
                    return reject(err);
                }
                console.log('no error');
                
                var output = Object.assign({}, params);
                console.log('OUTPUT');
                console.log(output);
                output.conversation = response;
                console.log('RESPONSE');
                console.log(response);
                
                delete output.CONVERSATION_USERNAME;
                delete output.CONVERSATION_PASSWORD;
                delete output.WORKSPACE_ID;
                if (output.__ow_method) {
                    delete output.__ow_method;
                    delete output.__ow_headers;
                    delete output.__ow_path;
                }
                console.log(JSON.stringify(output))
                return resolve(output);
        });
    });
}
