//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
require('./views/pages/v3/routing')(router)
require('./views/pages/v4/routing')(router)
require('./views/pages/v5/routing')(router)

const { getSupplier, getSupplierTotal } = require('./lib/suppliers')
const { getItem } = require('./lib/items')

// Logging session data
// This code shows in the terminal what session data has been saved.
router.use((req, res, next) => {
    const { static: staticData, ...sessionData } = req.session.data || {}

    const log = {
        method: req.method,
        url: req.originalUrl,
        data: sessionData,
        body: req.body
    }

    console.log(JSON.stringify(log, null, 2))

    next()
})

// This code shows in the terminal what page you are on and what the previous page was.
router.use('/', (req, res, next) => {
    res.locals.currentURL = req.originalUrl; //current screen
    res.locals.prevURL = req.get('Referrer'); // previous screen

    next();
});

router.use('/v2', require('./views/pages/v3/routing')());

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

const mvpUnbrandedBaseUrl = '/pages/'

// router.post('/submit-add-a-supplier', function (req, res) {
//     const choice = req.body['supplier-name'];
//     req.session.data['supplier-name'] = choice;

//     res.redirect(`${mvpUnbrandedBaseUrl}add-an-item`)
// });

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


const allowedUrls = [
    'http://localhost:3000/pages/v2/cancel-claim-scenario-1',
    'http://localhost:3000/pages/v2/cancel-claim-scenario-2',
    'http://localhost:3000/pages/v2/cancel-claim-scenario-3',
    'http://localhost:3000/pages/v2/cancel-supplier-pick-supplier-scenario-2',
    'http://localhost:3000/submit-supplier-pick?v=2&scenario=2',
    'http://localhost:3000/pages/v2/cancel-supplier',
    'http://localhost:3000/pages/v2/cancel-supplier-a2b-guidance',
    'http://localhost:3000/pages/v2/cancel-supplier-declaration',
    'http://localhost:3000/pages/v2/cancel-claim-scenario-2',
    'http://localhost:3000/pages/v2/cancel-claim-guidance-scenario-2'
];

router.post('/submit-cancel-claim-or-supplier', function (req, res) {
    const url = decodeURIComponent(req.params.url)
    const choice = req.body['claim-or-supplier']
    const version = req.query['v']
    const scenario = req.query['scenario']

    req.session.data['claim-or-supplier'] = choice
    const isAllowed = allowedUrls.includes(url);

    switch (choice) {
        case 'claim':
            if (isAllowed) {
                res.redirect(`${mvpUnbrandedBaseUrl}v${version}/cancel-claim-scenario-${scenario}`)
            }
            break
        case 'supplier':
            if (isAllowed) {
                res.redirect(`${mvpUnbrandedBaseUrl}v${version}/cancel-supplier-pick-supplier-scenario-${scenario}`)
            }
            break
    }
})

// cancel-supplier-a2b-funds

router.post('/submit-cancel-supplier-a2b-funds', function (req, res) {
    const url = decodeURIComponent(req.params.url)
    const isAllowed = allowedUrls.includes(url);
    const choice = req.body['cancel-supplier-eligibility-check']
    const version = req.query['v']

    req.session.data['cancel-supplier-eligibility-check'] = choice

    switch (choice) {
        case 'No':
            if (isAllowed) {
                res.redirect(`${mvpUnbrandedBaseUrl}v${version}/cancel-supplier`)
            }
            break
        case 'Yes':
            if (isAllowed) {
                res.redirect(`${mvpUnbrandedBaseUrl}v${version}/cancel-supplier-a2b-guidance`)
            }
            break
    }
})

// submit-cancel-claim-a2b-cps-funds

router.post('/submit-cancel-claim-a2b-cps-funds', function (req, res) {
    const url = decodeURIComponent(req.params.url)
    const isAllowed = allowedUrls.includes(url);
    const choice = req.body['cancel-claim-check']
    const version = req.query['v']

    req.session.data['cancel-claim-check'] = choice

    switch (choice) {
        case 'No':
            if (isAllowed) {
                res.redirect(`${mvpUnbrandedBaseUrl}v${version}/cancel-claim`)
            }
            break
        case 'Yes':
            if (isAllowed) {
                res.redirect(`${mvpUnbrandedBaseUrl}v${version}/cancel-claim-guidance-scenario-2`)
            }
            break
    }
})

// submit-cancel-claim-eligibility


router.post('/submit-cancel-claim-eligibility', function (req, res) {
    const url = decodeURIComponent(req.params.url)
    const isAllowed = allowedUrls.includes(url);
    const choice = req.body['cancel-claim-eligibility-check']
    const version = req.query['v']

    req.session.data['cancel-claim-eligibility-check'] = choice

    switch (choice) {
        case 'No':
            if (isAllowed) {
                res.redirect(`${mvpUnbrandedBaseUrl}v${version}/cancel-claim`)
            }
            break
        case 'Yes':
            if (isAllowed) {
                res.redirect(`${mvpUnbrandedBaseUrl}v${version}/cancel-claim-guidance-scenario-2`)
            }
            break
    }
})

router.post('/submit-cancel-supplier-eligibility', function (req, res) {
    const url = decodeURIComponent(req.params.url)
    const isAllowed = allowedUrls.includes(url);
    const choice = req.body['cancel-supplier-eligibility-check']
    const version = req.query['v']

    req.session.data['cancel-supplier-eligibility-check'] = choice

    switch (choice) {
        case 'No':
            if (isAllowed) {
                res.redirect(`${mvpUnbrandedBaseUrl}v${version}/cancel-supplier`)
            }
            break
        case 'Yes':
            if (isAllowed) {
                res.redirect(`${mvpUnbrandedBaseUrl}v${version}/cancel-supplier-a2b-guidance`)
            }
            break
    }
})

// /submit-supplier-pick

router.post('/submit-supplier-pick', function (req, res) {
    const url = decodeURIComponent(req.params.url)
    const isAllowed = allowedUrls.includes(url);
    const choice = req.body['supplier-pick']
    const version = req.query['v']
    const scenario = req.query['scenario']

    req.session.data['supplier-pick'] = choice

    switch (choice) {
        case 'supplier-1':
            if (isAllowed) {
                res.redirect(`${mvpUnbrandedBaseUrl}v${version}/cancel-supplier`)
            }
            break
        case 'supplier-2':
            if (isAllowed) {
                res.redirect(`${mvpUnbrandedBaseUrl}v${version}/cancel-supplier-scenario-2`)
            }
            break
    }
})

/** v1a */

const v1aBaseUrl = '/pages/v1a'

router.post(`${v1aBaseUrl}/location`, function (req, res) {
    req.session.data.location = req.body.location;

    res.redirect(`${v1aBaseUrl}/customer-search`)

})

router.post(`${v1aBaseUrl}/customer-search`, function (req, res) {

    req.session.data.nino = req.body.nino;

    res.redirect(`${v1aBaseUrl}/customer-details`)

})

router.post(`${v1aBaseUrl}/customer-details`, function (req, res) {

    const { isIdentityVerified } = req.body

    req.session.data.isIdentityVerified = Array.isArray(isIdentityVerified) && isIdentityVerified.includes('true')

    res.redirect(`${v1aBaseUrl}/universal-credit`)

})

router.post(`${v1aBaseUrl}/customer-address`, function (req, res) {
    const { line1, line2, city, county, postcode, reasonForChange, reasonForChangeOther } = req.body

    req.session.data.address = { line1, line2, city, county, postcode }
    req.session.data.reasonForChange = reasonForChange
    req.session.data.reasonForChangeOther = reasonForChangeOther

    res.redirect(`${v1aBaseUrl}/customer-details`)

})

router.post(`${v1aBaseUrl}/universal-credit`, function (req, res) {
    const { claimantId, workGroup } = req.body

    req.session.data.claimantId = claimantId
    req.session.data.workGroup = workGroup

    res.redirect(`${v1aBaseUrl}/payment`)

})

router.post(`${v1aBaseUrl}/payment`, function (req, res) {

    req.session.data.payment = req.body.payment


    res.redirect(`${v1aBaseUrl}/reason`)

})

router.post(`${v1aBaseUrl}/reason`, function (req, res) {

    req.session.data.reason = req.body.reason


    res.redirect(`${v1aBaseUrl}/details`)

})

router.post(`${v1aBaseUrl}/details`, function (req, res) {

    const { day,
        month,
        year,
        moreInformation,
        supportingEvidence,
        isRapidResponse } = req.body

    req.session.data.claimDate = { day, month, year }
    req.session.data.moreInformation = moreInformation
    req.session.data.supportingEvidence = supportingEvidence
    req.session.data.isRapidResponse = isRapidResponse

    const suppliers = req.session.data.suppliers || []

    if (suppliers.length > 0) {
        res.redirect(`${v1aBaseUrl}/suppliers`)
    }
    else {
        req.session.data.supplierId = '0'
        req.session.data.suppliers = [{ id: '0' }]
        res.redirect(`${v1aBaseUrl}/suppliers/name`)
    }

})

// Suppliers

router.get(`${v1aBaseUrl}/suppliers/name`, (req, res) => {

    const supplier = getSupplier(req.session.data, req.session.data.supplierId)

    res.render(`${v1aBaseUrl}/supplier-name`, { supplierName: supplier.name })
})


router.post(`${v1aBaseUrl}/suppliers/name`, (req, res) => {
    const supplier = getSupplier(
        req.session.data,
        req.session.data.supplierId
    )

    if (supplier) {
        supplier.name = req.body.supplierName

        // Create item if none exist
        if (!supplier.items || supplier.items.length === 0) {

            const item = {
                id: '0'
            }

            supplier.items = [
                item
            ]
        }

        req.session.data.itemId = '0'

        return res.redirect(
            `${v1aBaseUrl}/suppliers/items/category`
        )
    }

    res.redirect(`${v1aBaseUrl}/suppliers`)
})

// Items
router.get(
    `${v1aBaseUrl}/suppliers/items/category`,
    (req, res) => {


        const { data } = req.session

        const { supplierId, itemId } = data

        const supplier = getSupplier(
            data,
            supplierId
        )

        const item = getItem(
            data,
            supplierId,
            itemId
        )

        res.render(`${v1aBaseUrl}/item-category`, {
            itemCategory: item?.category, pageCaption: supplier.name
        }
        )
    }
)

router.post(
    `${v1aBaseUrl}/suppliers/items/category`,
    (req, res) => {

        const { data } = req.session

        const { supplierId, itemId } = data

        const supplier = getSupplier(
            data,
            supplierId
        )

        const item = getItem(
            data,
            supplierId,
            itemId
        )

        if (item) {
            item.category = req.body.itemCategory
        }

        if (['TRAVEL', 'TOOLS_AND_EQUIPMENT'].includes(item?.category)) {
            res.redirect(
                `${v1aBaseUrl}/suppliers/items/subcategory`
            )
        }

        res.redirect(`${v1aBaseUrl}/suppliers/items/details`)
    }

)

router.get(
    `${v1aBaseUrl}/suppliers/:supplierId/items/:itemId/subcategory`,
    (req, res) => {

        const { data } = req.session

        const { supplierId, itemId } = data

        const supplier = getSupplier(
            data,
            supplierId
        )

        const item = getItem(
            data,
            supplierId,
            itemId
        )

        let pageHeading
        let radioItems

        if (item.category === 'TOOLS_AND_EQUIPMENT') {
            pageHeading = 'Tools and equipment'
            radioItems = data.static.itemSubcategories.tools
        }

        if (item.category === 'TRAVEL') {
            pageHeading = 'Travel'
            radioItems = data.static.itemSubcategories.travel
        }

        res.render(`${v1aBaseUrl}/item-subcategory`, {
            pageHeading,
            pageCaption: supplier.name,
            radioItems,
            itemSubCategory: item.subCategory
        })
    }
)


router.post(
    `${v1aBaseUrl}/suppliers/items/subcategory`,
    (req, res) => {
        const { data } = req.session

        const { supplierId, itemId } = data

        const supplier = getSupplier(
            data,
            supplierId
        )

        const item = getItem(
            data,
            supplierId,
            itemId
        )

        if (item) {
            item.subcategory = req.body.itemSubcategory
        }

        res.redirect(`${v1aBaseUrl}/suppliers/items/details`)

    }
)

router.get(
    `${v1aBaseUrl}/suppliers/items/details`,
    (req, res) => {

        const { data } = req.session

        const { supplierId, itemId } = data

        const supplier = getSupplier(
            data,
            supplierId
        )

        const item = getItem(
            data,
            supplierId,
            itemId
        )

        res.render(`${v1aBaseUrl}/item-details`, {
            supplier,
            pageCaption: supplier.name,
            item
        })
    }
)


router.post(
    `${v1aBaseUrl}/suppliers/items/details`,
    (req, res) => {
        const { data } = req.session

        const { supplierId, itemId } = data

        const { itemName, itemCost, moreInformation } = req.body

        const supplier = getSupplier(
            data,
            supplierId
        )

        const item = getItem(
            data,
            supplierId,
            itemId
        )

        if (item) {
            item.name = itemName,
                item.cost = itemCost,
                item.moreInformation = moreInformation
        }


        res.redirect(`${v1aBaseUrl}/suppliers/items`)
    }
)

router.get(
    `${v1aBaseUrl}/suppliers/items`,
    (req, res) => {

        const { data } = req.session

        const { supplierId, itemId } = data

        const supplier = getSupplier(
            data,
            supplierId
        )

        const supplierTotal = getSupplierTotal(data,
            supplierId)


        res.render(`${v1aBaseUrl}/items`, {
            supplier,
            items: supplier.items,
            pageCaption: supplier?.name ?? '',
            supplierTotal
        })
    }
)