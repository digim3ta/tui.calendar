/**
 * @fileoverview View of week event container inside of Week view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domutil = require('../common/domutil');
var datetime = require('../datetime');
var View = require('./view');
var Day = require('./day');
var tmpl = require('./template/week/monthweek.hbs');

/**
 * @constructor
 * @extends {View}
 * @param {object} options - view options.
 * @param {object} [options.height=72] - height of monthweek views.
 * @param {HTMLDIVElement} container - DOM element to use container for this view.
 * TODO: split week?
 */
function MonthWeek(options, container) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        'schedule-view-allday-monthweek'
    );

    /**
     * @type {object}
     */
    this.options = util.extend({
        height: 72    // default value when Month view rendering.
    }, options);

    View.call(this, null, container);
}

util.inherit(MonthWeek, View);

/**
 * get base viewmodel for monthweek view.
 * @param {array} range - date array to rendering.
 * @returns {object} view model for monthweek view.
 */
MonthWeek.prototype._getBaseViewModel = function(range) {
    var widthPercent = 100 / range.length;

    return {
        height: this.options.height,
        eventGrid: util.map(range, function() {
            return widthPercent;
        })
    };
};

/**
 * @override
 * @param {object} viewModel - viewModel from parent views.
 */
MonthWeek.prototype.render = function(viewModel) {
    var range = datetime.range(
            viewModel.renderStartDate,
            viewModel.renderEndDate,
            datetime.MILLISECONDS_PER_DAY
        ),
        container = this.container;

    container.innerHTML = tmpl(this._getBaseViewModel(range));

    util.forEach(range, function(date) {
        var dayView = new Day({
            ymd: datetime.format(date, 'YYYYMMDD'),
            width: 100 / range.length
        }, domutil.find('.schedule-view-monthweek-events'));

        this.addChild(dayView);
    }, this);

    this.childs.each(function(childView) {
        childView.render(viewModel);
    });
};

module.exports = MonthWeek;
