module.exports = () => {
    const govukPrototypeKit = require('govuk-prototype-kit');
    const subRouter = govukPrototypeKit.requests.setupRouter();

    subRouter.use((req, res, next) => {
        const originalRedirect = res.redirect;
        res.redirect = function (url) {
            if (url.startsWith('/') && !url.startsWith(req.baseUrl)) {
                url = req.baseUrl + url;
            }

            return originalRedirect.call(this, url);
        };

        next();
    });

    subRouter.get('/item-list', function (req, res) {
        const version = req.query['v'] || 'default'
        const template = version === "default" ? 'pages/v3/item-list' : `pages/v3/item-list-${version}`
        res.render(template, { versions, path: '/pages/v3/item-list' })
    })

    subRouter.post('/submit-add-a-supplier-v3', function (req, res) {
        const choice = req.body['supplier-name'];
        req.session.data['supplier-name'] = choice;

        res.redirect('/pages/v3/add-an-item')
    });

    subRouter.post('/submit-item-category-v3', function (req, res) {
        const choice = req.body['item-category'];
        req.session.data['item-category'] = choice;

        if (choice === 'TOOLS_AND_EQUIPMENT') {
            res.redirect(`/pages/v3/item-tools`)
        }
        else if (choice === 'TRAVEL') {
            res.redirect(`/pages/v3/item-travel`)
        } else {
            res.redirect(`/pages/v3/item-details`)
        }
    });

    subRouter.post('/submit-item-subcategory-v3', function (req, res) {
        const choice = req.body['item-subcategory'];
        req.session.data['item-subcategory'] = choice;

        res.redirect(`/pages/v3/item-details`)
    });

    subRouter.post('/submit-review-v3', function (req, res) {
        const reviewerDecision = req.body['reviewer-decision']

        req.session.data['rejection-reason'] = reviewerDecision

        const isRejected = reviewerDecision === 'reject'

        if (isRejected) {
            req.session.data['rejection-reason'] = req.body['rejection-reason']
            res.redirect(`/pages/v3/claim-reject`)
        }
        else {
            res.redirect(`/pages/v3/claim-approve`)
        }
    });

    return subRouter;
};