(function() {
    'use strict';

    var app = angular.module('ngLandlord');

    app.factory('LayoutManager', function() {
        var LayoutManager = {};
        var mgr = window.__layoutMgr;

        LayoutManager.panels = {
            sideNav: mgr.west,
            appHeader: mgr.center.children.layout1.north,
            mainPanel: mgr.center.children.layout1.west,
            mainContent: mgr.center.children.layout1.center,
            footer: mgr.center.children.layout1.south,
            flyOut: mgr.center.children.layout1.center.children.layout1.west,
            maps: mgr.center.children.layout1.center.children.layout1.center
        };

        LayoutManager.layouts = {
            sideNav: mgr,
            appHeader: mgr.center.children.layout1,
            mainPanel: mgr.center.children.layout1,
            mainContent: mgr.center.children.layout1,
            footer: mgr.center.children.layout1,
            flyOut: mgr.center.children.layout1.center.children.layout1,
            maps: mgr.center.children.layout1.center.children.layout1
        }

        LayoutManager.toggleFlyout = function(){
              this.layouts.flyOut.toggle('west', true);
        }


        return LayoutManager;
    })
})()
