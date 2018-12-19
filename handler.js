var natural = require('natural');

module.exports = {
	'PorterStemmer': function(data, wordList, flag, callback){
		
			var result = [];
                        console.log('Resetting');
                        var previousElement;
	                natural.PorterStemmer.attach();
        	        let payload = data.tokenizeAndStem();
                	payload = payload.filter((v, i, a) => a.indexOf(v) === i);

                	payload.forEach(resultBagElement => {
                        	wordList.forEach(testBagElement => {
                                	let elementData = testBagElement.tokenizeAndStem().join("");
                                	let threshold = natural.JaroWinklerDistance(elementData, resultBagElement);
                                	//console.log('Actual Threshold : ', threshold)
                                	if(threshold>=0.87){
                                        	if(previousElement!=resultBagElement){
                                                	console.log("Matched : " + resultBagElement + " with " + elementData);
                                                	result.push(testBagElement.charAt(0).toUpperCase() + testBagElement.slice(1));
                                        	}
                                        	previousElement = resultBagElement;
                                	}
                        	});
                	});
			 callback(null, result.filter((v, i, a) => a.indexOf(v) === i));
                }
}
