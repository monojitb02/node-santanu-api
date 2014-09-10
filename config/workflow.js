'use strict';
exports = module.exports = function(req, res) {
    var workflow = new(require('events').EventEmitter)();

    workflow.outcome = {
        success: false,
        errors: [],
        errfor: {}
    };

    workflow.hasErrors = function() {
        return Object.keys(workflow.outcome.errfor).length !== 0 || workflow.outcome.errors.length !== 0;
    };

    workflow.on('exception', function(err) {
        workflow.outcome.errors.push('Exception: ' + err);
        return workflow.emit('response');
    });

    workflow.on('response', function() {
        workflow.outcome.success = !workflow.hasErrors();
        res.send(workflow.outcome);
    });

    return workflow;
};

/*
exports = module.exports = function() {
    var workflow = {};
    workflow.outcome = {
        success: false,
        commonErrors: [],
        otherErrors: []
    };

    var hasErrors = function() {
        workflow.outcome.success = !(workflow.outcome.commonErrors.length +
            workflow.outcome.otherErrors.length)
        return workflow.outcome.success;
    };
    workflow.get = function() {
        return workflow.outcome;
    }

    workflow.registerCommonError = function(errMsg) {
        workflow.outcome.commonErrors.push(errMsg);
        workflow.hasErrors();
    };
    workflow.registerOtherError = function(err) {
        workflow.outcome.otherErrors.push(err);        
        workflow.hasErrors();
    };
    workflow.on('response', function() {
        workflow.outcome.success = !workflow.hasErrors();
        return
    });

    return workflow;
};
*/
