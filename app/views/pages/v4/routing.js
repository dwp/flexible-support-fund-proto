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

    subRouter.get('/submit-item-list', function (req, res) {
        const choice = req.session.data['payment-method'];

        if (choice === 'CENTRAL_PAYMENT_SYSTEM') {
            res.redirect(`/pages/v4/cps-payment-details`)
        }
        else {
            res.redirect(`/pages/v4/suppliers`)
        }
    })

    ///submit-add-a-supplier-v4
    subRouter.post('/submit-add-a-supplier-v4', function (req, res) {
        const choice = req.body['supplier-name'];
        req.session.data['supplier-name'] = choice;

        res.redirect('/pages/v4/add-an-item')
    });

    subRouter.post('/submit-item-category-v4', function (req, res) {
        const choice = req.body['item-category'];
        req.session.data['item-category'] = choice;

        if (choice === 'TOOLS_AND_EQUIPMENT') {
            res.redirect(`/pages/v4/item-tools`)
        }
        else if (choice === 'TRAVEL') {
            res.redirect(`/pages/v4/item-travel`)
        } else {
            res.redirect(`/pages/v4/item-details`)
        }
    });

    subRouter.post('/submit-item-subcategory-v4', function (req, res) {
        const choice = req.body['item-subcategory'];
        req.session.data['item-subcategory'] = choice;

        res.redirect(`/pages/v4/item-details`)
    });

    subRouter.post('/submit-review-v4', function (req, res) {
        const reviewerDecision = req.body['reviewer-decision']

        req.session.data['rejection-reason'] = reviewerDecision

        const isRejected = reviewerDecision === 'reject'

        if (isRejected) {
            req.session.data['rejection-reason'] = req.body['rejection-reason']
            res.redirect(`/pages/v4/claim-reject`)
        }
        else {
            res.redirect(`/pages/v4/claim-approve`)
        }
    });

    return subRouter;
};