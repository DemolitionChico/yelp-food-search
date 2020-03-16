/*
    Ii is always useful to manage static string outside components. That makes further localization significantly easier
*/
const staticStringsProvider = {
    'App:Title': 'Simple Yelp App',
    'NotFound:Title': '404: Resource not found',
    'NotFound:Tip': 'You can go home now...',
    'NotFound:BtnTxt': 'Search for another place!',

    'Search:Heading': 'Yelp search',
    'Search:Placeholder': 'Search for exciting places nearby',
    'Search:PlaceholderAlt': 'Type search term',
    'Search:LocationRequiredError': 'Location is required. You can set it in filters.',
    'Search:NoResults': 'No results found :(',

    'Filters:Location': 'Location',
    'Filters:RangeLabel': 'Radius',
    'Filters:CategoriesLabel': 'Categories',
    'Filters:OpenNowLabel': 'Is open now',
    'Filters:SearchBtnLabel': 'SEARCH',

    'Results:RequestProcessingError': 'Sorry, we were unable to process your request. Try again later or search again!',
    'Results:NoImage': 'No image',

    'Company:NoPhone': 'No phone number',
    'Company:Categories': 'Categories',
    'Company:Address': 'Address',
    'Company:Rating': 'Rating',
    'Company:DetailsLinkLabel': 'See details',

    'Details:ReviewsLabel': 'Reviews',
    
    'Forms:Required': "Required",
    'Forms:RequiredFieldValidationError': 'This field is required'
}

export default staticStringsProvider;