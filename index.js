const natural = require('natural');

const stemmer = natural.PorterStemmerRu;
const LevenshteinDistanceSearch = natural.LevenshteinDistanceSearch;

const estimate = (conversation, criterias) => {
    const conversationTokensPhrases = conversation.map(c => stemmer.tokenizeAndStem(c).join(' '));
    // console.log('s', conversationTokensPhrases);

    const conversationCriteriasTrue = [];
    const resultMap = criterias.map(criteria => {
        const phrases = criteria.phrases;
        const stemmedPhrases = phrases.map(c => stemmer.tokenizeAndStem(c).join(' '));
        const criteriaResult = conversationTokensPhrases.map(conversationPhrase => {
            const r = [];
            for (const stemmedPhrase of stemmedPhrases) {
                const stemmedPhraseMaxDistance = Math.ceil(stemmedPhrase.length * 0.5);
                const searchResult = LevenshteinDistanceSearch(stemmedPhrase, conversationPhrase);
                const isSatisfied = searchResult.distance <= stemmedPhraseMaxDistance;
                r.push({
                    stemmedPhrase,
                    conversationPhrase,
                    stemmedPhraseMaxDistance,
                    searchResult,
                    distance: searchResult.distance,
                    isSatisfied,
                });
                if (isSatisfied) {
                    conversationCriteriasTrue.push({
                        isSatisfied,
                        criteriaName: criteria.name,
                    });
                }
            }
            //console.log('r:', r);
            return r;
        })
        return criteriaResult;
    });
    // console.log('conversationResult', JSON.stringify(conversationResult, null, '  '));
    return {conversationCriteriasTrue, resultMap};
}

module.exports = {
    estimate,
}
