//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Find an address plugin
const findAddressPlugin = require("find-an-address-plugin");

findAddressPlugin(router);

// Logging session data  
// This code shows in the terminal what session data has been saved.
router.use((req, res, next) => {
    const log = {
        method: req.method,
        url: req.originalUrl,
        data: req.session.data
    }
    console.log(JSON.stringify(log, null, 2))

    next()
})

// This code shows in the terminal what page you are on and what the previous page was.
router.use('/', (req, res, next) => {
    res.locals.currentURL = req.originalUrl; //current screen  
    res.locals.prevURL = req.get('Referrer'); // previous screen

    console.log('folder : ' + res.locals.folder + ', subfolder : ' + res.locals.subfolder);

    next();
});

// Routing for the example journey. 
router.post('/country-answer', function (request, response) {

    var country = request.session.data['country']
    if (country == "England") {
        response.redirect("example/complete")
    } else {
        response.redirect("example/ineligible")
    }
})


// Conditional content
router.post('/submit-reason', function (req, res) {
    const choice = req.body['claimReason'];
    req.session.data['claimReason'] = choice;

    if (choice === 'Employment') {
        res.redirect('/prototypes/conditional-content/claim-reason/pick-employment');
    } else if (choice === 'Self-employment start') {
        res.redirect('/prototypes/conditional-content/claim-reason/self-employment-details');
    } else if (choice === 'Training course') {
        res.redirect('/prototypes/conditional-content/claim-reason/training-course-details');
    } else if (choice === 'Jobcentre Plus appointment') {
        res.redirect('/prototypes/conditional-content/claim-reason/jobcentre-appointment-details');
    } else if (choice === 'Job search support') {
        res.redirect('/prototypes/conditional-content/claim-reason/job-search-details');
    } else if (choice === 'Something else') {
        res.redirect('/prototypes/conditional-content/claim-reason/other-details');
    } else {
        res.redirect('/prototypes/conditional-content/claim-reason/programme-details');
    }
});

router.post('/submit-reason-2', function (req, res) {
    const choice = req.body['claimReason'];
    req.session.data['claimReason'] = choice;

    if (choice === 'Employment') {
        res.redirect('/prototypes/zero-free-texts/pick-employment');
    } else {
        res.redirect('/prototypes/zero-free-texts/claim-details');
    }
});

router.post('/submit-item', function (req, res) {
    const choice = req.body['pickItem'];
    req.session.data['pickItem'] = choice;

    if (choice === 'Travel') {
        res.redirect('/prototypes/conditional-content/add-item/pick-travel');
    } else if (choice === 'Tools and equipment') {
        res.redirect('/prototypes/conditional-content/add-item/pick-equipment');
    } else if (choice === 'Identification') {
        res.redirect('/prototypes/conditional-content/add-item/identification-details');
    } else if (choice === 'Accommodation') {
        res.redirect('/prototypes/conditional-content/add-item/accommodation-details');
    } else if (choice === 'Something else') {
        res.redirect('/prototypes/conditional-content/add-item/other-details');
    } else {
        res.redirect('/prototypes/conditional-content/add-item/standard-details');
    }
});

router.post('/submit-travel', function (req, res) {
    const choice = req.body['travel'];
    req.session.data['travel'] = choice;

    if (choice === 'Season ticket') {
        res.redirect('/prototypes/conditional-content/add-item/season-ticket-details');
    } else if (choice === 'Fuel') {
        res.redirect('/prototypes/conditional-content/add-item/fuel-details');
    } else {
        res.redirect('/prototypes/conditional-content/add-item/travel-details');
    }
});

// Remove free text entry
router.post('/zero-texts-pick-item', function (req, res) {
    const choice = req.body['pickItem'];
    req.session.data['pickItem'] = choice;

    if (choice === 'Travel') {
        res.redirect('/prototypes/zero-free-texts/pick-travel');
    } else if (choice === 'Tools and equipment') {
        res.redirect('/prototypes/zero-free-texts/pick-equipment');
    } else {
        res.redirect('/prototypes/zero-free-texts/standard-item');
    }
});

// Upload supporting evidence
router.post('/submit-reason-cc-iteration-3', function (req, res) {
    const choice = req.body['claimReason'];
    req.session.data['claimReason'] = choice;

    if (choice === 'Employment') {
        res.redirect('/prototypes/cc-iteration-3/claim-reason/pick-employment');
    } else if (choice === 'Self-employment start') {
        res.redirect('/prototypes/cc-iteration-3/claim-reason/self-employment-details');
    } else if (choice === 'Training course') {
        res.redirect('/prototypes/cc-iteration-3/claim-reason/training-course-details');
    } else if (choice === 'Jobcentre Plus appointment') {
        res.redirect('/prototypes/cc-iteration-3/claim-reason/jobcentre-appointment-details');
    } else if (choice === 'Job search support') {
        res.redirect('/prototypes/cc-iteration-3/claim-reason/pick-supporting-evidence');
    } else if (choice === 'Something else') {
        res.redirect('/prototypes/cc-iteration-3/claim-reason/other-details');
    } else {
        res.redirect('/prototypes/cc-iteration-3/claim-reason/programme-details');
    }
});

router.post('/supporting-evidence-cc-iteration-3', function (req, res) {
    const choice = req.body['supportingEvidence'];
    req.session.data['supportingEvidence'] = choice;

    if (choice === 'Not required') {
        res.redirect('/prototypes/cc-iteration-3/add-supplier');
    } else {
        res.redirect('/prototypes/cc-iteration-3/claim-reason/upload-evidence');
    }
});

router.post('/submit-item-cc-iteration-3', function (req, res) {
    const choice = req.body['pickItem'];
    req.session.data['pickItem'] = choice;

    if (choice === 'Travel') {
        res.redirect('/prototypes/cc-iteration-3/add-item/pick-travel');
    } else if (choice === 'Tools and equipment') {
        res.redirect('/prototypes/cc-iteration-3/add-item/pick-equipment');
    } else if (choice === 'Identification') {
        res.redirect('/prototypes/cc-iteration-3/add-item/identification-details');
    } else if (choice === 'Accommodation') {
        res.redirect('/prototypes/cc-iteration-3/add-item/accommodation-details');
    } else if (choice === 'Something else') {
        res.redirect('/prototypes/cc-iteration-3/add-item/other-details');
    } else {
        res.redirect('/prototypes/cc-iteration-3/add-item/standard-details');
    }
});

router.post('/submit-travel-cc-iteration-3', function (req, res) {
    const choice = req.body['travel'];
    req.session.data['travel'] = choice;

    if (choice === 'Season ticket') {
        res.redirect('/prototypes/cc-iteration-3/add-item/season-ticket-details');
    } else if (choice === 'Fuel') {
        res.redirect('/prototypes/cc-iteration-3/add-item/fuel-details');
    } else {
        res.redirect('/prototypes/cc-iteration-3/add-item/travel-details');
    }
});

// Descriptive navigation
router.post('/submit-reason-cc-iteration-4', function (req, res) {
    const choice = req.body['claimReason'];
    req.session.data['claimReason'] = choice;

    if (choice === 'Employment') {
        res.redirect('/prototypes/cc-iteration-4/claim-reason/pick-employment');
    } else if (choice === 'Self-employment start') {
        res.redirect('/prototypes/cc-iteration-4/claim-reason/self-employment-details');
    } else if (choice === 'Training course') {
        res.redirect('/prototypes/cc-iteration-4/claim-reason/training-course-details');
    } else if (choice === 'Jobcentre Plus appointment') {
        res.redirect('/prototypes/cc-iteration-4/claim-reason/jobcentre-appointment-details');
    } else if (choice === 'Job search support') {
        res.redirect('/prototypes/cc-iteration-4/claim-reason/job-search-details');
    } else if (choice === 'Something else') {
        res.redirect('/prototypes/cc-iteration-4/claim-reason/other-details');
    } else {
        res.redirect('/prototypes/cc-iteration-4/claim-reason/programme-details');
    }
});

router.post('/submit-item-cc-iteration-4', function (req, res) {
    const choice = req.body['pickItem'];
    req.session.data['pickItem'] = choice;

    if (choice === 'Travel') {
        res.redirect('/prototypes/cc-iteration-4/add-item/pick-travel');
    } else if (choice === 'Tools and equipment') {
        res.redirect('/prototypes/cc-iteration-4/add-item/pick-equipment');
    } else if (choice === 'Identification') {
        res.redirect('/prototypes/cc-iteration-4/add-item/identification-details');
    } else if (choice === 'Accommodation') {
        res.redirect('/prototypes/cc-iteration-4/add-item/accommodation-details');
    } else if (choice === 'Something else') {
        res.redirect('/prototypes/cc-iteration-4/add-item/other-details');
    } else {
        res.redirect('/prototypes/cc-iteration-4/add-item/standard-details');
    }
});

router.post('/submit-travel-cc-iteration-4', function (req, res) {
    const choice = req.body['travel'];
    req.session.data['travel'] = choice;

    if (choice === 'Season ticket') {
        res.redirect('/prototypes/cc-iteration-4/add-item/season-ticket-details');
    } else if (choice === 'Fuel') {
        res.redirect('/prototypes/cc-iteration-4/add-item/fuel-details');
    } else {
        res.redirect('/prototypes/cc-iteration-4/add-item/travel-details');
    }
});

// Iteration 1

router.post('/cc-1-submit-reason', function (req, res) {
    const choice = req.body['claimReason'];
    req.session.data['claimReason'] = choice;

    if (choice === 'Employment') {
        res.redirect('/prototypes/cc-iteration-1/claim-reason/pick-employment');
    } else if (choice === 'Self-employment start') {
        res.redirect('/prototypes/cc-iteration-1/claim-reason/self-employment-details');
    } else if (choice === 'Training course') {
        res.redirect('/prototypes/cc-iteration-1/claim-reason/training-course-details');
    } else if (choice === 'Jobcentre Plus appointment') {
        res.redirect('/prototypes/cc-iteration-1/claim-reason/jobcentre-appointment-details');
    } else if (choice === 'Job search support') {
        res.redirect('/prototypes/cc-iteration-1/claim-reason/job-search-details');
    } else if (choice === 'Something else') {
        res.redirect('/prototypes/cc-iteration-1/claim-reason/other-details');
    } else {
        res.redirect('/prototypes/cc-iteration-1/claim-reason/programme-details');
    }
});

router.post('/cc-1-submit-item', function (req, res) {
    const choice = req.body['pickItem'];
    req.session.data['pickItem'] = choice;

    if (choice === 'Travel') {
        res.redirect('/prototypes/cc-iteration-1/add-item/pick-travel');
    } else if (choice === 'Tools and equipment') {
        res.redirect('/prototypes/cc-iteration-1/add-item/pick-equipment');
    } else if (choice === 'Identification') {
        res.redirect('/prototypes/cc-iteration-1/add-item/identification-details');
    } else if (choice === 'Accommodation') {
        res.redirect('/prototypes/cc-iteration-1/add-item/accommodation-details');
    } else if (choice === 'Something else') {
        res.redirect('/prototypes/cc-iteration-1/add-item/other-details');
    } else {
        res.redirect('/prototypes/cc-iteration-1/add-item/standard-details');
    }
});

router.post('/cc-1-submit-travel', function (req, res) {
    const choice = req.body['travel'];
    req.session.data['travel'] = choice;

    if (choice === 'Season ticket') {
        res.redirect('/prototypes/cc-iteration-1/add-item/season-ticket-details');
    } else if (choice === 'Fuel') {
        res.redirect('/prototypes/cc-iteration-1/add-item/fuel-details');
    } else {
        res.redirect('/prototypes/cc-iteration-1/add-item/travel-details');
    }
});

router.post('/cc-1-submit-item-2', function (req, res) {
    const choice = req.body['pickItem2'];
    req.session.data['pickItem2'] = choice;

    if (choice === 'Travel') {
        res.redirect('/prototypes/cc-iteration-1/add-item/add-item-2/pick-travel-2');
    } else if (choice === 'Tools and equipment') {
        res.redirect('/prototypes/cc-iteration-1/add-item/add-item-2/pick-equipment-2');
    } else if (choice === 'Identification') {
        res.redirect('/prototypes/cc-iteration-1/add-item/add-item-2/identification-details-2');
    } else if (choice === 'Accommodation') {
        res.redirect('/prototypes/cc-iteration-1/add-item/add-item-2/accommodation-details-2');
    } else if (choice === 'Something else') {
        res.redirect('/prototypes/cc-iteration-1/add-item/add-item-2/other-details-2');
    } else {
        res.redirect('/prototypes/cc-iteration-1/add-item/add-item-2/standard-details-2');
    }
});

router.post('/cc-1-submit-travel-2', function (req, res) {
    const choice = req.body['travel2'];
    req.session.data['travel2'] = choice;

    if (choice === 'Season ticket') {
        res.redirect('/prototypes/cc-iteration-1/add-item/add-item-2/season-ticket-details-2');
    } else if (choice === 'Fuel') {
        res.redirect('/prototypes/cc-iteration-1/add-item/add-item-2/fuel-details-2');
    } else {
        res.redirect('/prototypes/cc-iteration-1/add-item/add-item-2/travel-details-2');
    }
});

// MVP unbranded

const mvpUnbrandedBaseUrl = '/prototypes/mvp-unbranded/'

router.post('/submit-add-a-supplier', function (req, res) {
    const choice = req.body['supplier-name'];
    req.session.data['supplier-name'] = choice;

    res.redirect(`${mvpUnbrandedBaseUrl}add-an-item`)
});

router.post('/submit-item-category', function (req, res) {
    const choice = req.body['item-category'];
    req.session.data['item-category'] = choice;

    if (choice === 'TOOLS_AND_EQUIPMENT') {
        res.redirect(`${mvpUnbrandedBaseUrl}item-tools`)
    }
    else if (choice === 'TRAVEL') {
        res.redirect(`${mvpUnbrandedBaseUrl}item-travel`)
    } else {
        res.redirect(`${mvpUnbrandedBaseUrl}item-details`)
    }
});

router.post('/submit-item-subcategory', function (req, res) {
    const choice = req.body['item-subcategory'];
    req.session.data['item-subcategory'] = choice;

    res.redirect(`${mvpUnbrandedBaseUrl}item-details`)
});

router.post('/submit-review', function (req, res) {
    const reviewerDecision = req.body['reviewer-decision']

    req.session.data['rejection-reason'] = reviewerDecision

    const isRejected = reviewerDecision === 'reject'

    if (isRejected) {
        req.session.data['rejection-reason'] = req.body['rejection-reason']
        res.redirect(`${mvpUnbrandedBaseUrl}claim-reject`)
    }
    else {
        res.redirect(`${mvpUnbrandedBaseUrl}claim-approve`)
    }
});

