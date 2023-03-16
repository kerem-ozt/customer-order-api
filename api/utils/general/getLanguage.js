import getLangen from '../../../api/languages/english';
import getLangtr from '../../../api/languages/turkish';

const languages = {
	en: getLangen,
	tr: getLangtr
};

//export default function(language, message, label, limit){
export default function(language, message){
	console.log(language);
	console.log(message);
	return languages[language][message];

}