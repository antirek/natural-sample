const criterias = require('./criterias');
const {estimate} = require('./index');

const conversation = [
    'алло здравствуйте',
    'а подскажите пожалуйста как могу поговорить с руководителем отдела продаж',
    'а мы просто ранее общались с вашей компанией по поводу продаж',
];

const {conversationCriteriasTrue, resultMap} = estimate(conversation, criterias);

console.log('result', JSON.stringify(conversationCriteriasTrue, null, '  '));