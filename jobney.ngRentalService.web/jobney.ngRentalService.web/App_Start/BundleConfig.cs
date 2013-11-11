using System.Web;
using System.Web.Optimization;

namespace jobney.ngRentalService.web
{
    public class BundleConfig
    {
        public static void Configure()
        {
            BundleTable.Bundles.IgnoreList.Clear();
            //if (!Debugger.IsAttached)
            //{
            //    BundleTable.EnableOptimizations = true;
            //}
            BundleTable.EnableOptimizations = false;
            var jsShivBundle = new ScriptBundle("~/Assets/js/compatibility");
            jsShivBundle.Include("~/Assets/js/libs/json2.js");
            jsShivBundle.Include("~/Assets/js/libs/modernizr-2.6.2.js");
            BundleTable.Bundles.Add(jsShivBundle);

            var jsBundle = new ScriptBundle("~/Assets/js/bundle");
            jsBundle.Include("~/Assets/js/jquery-2.0.3.min.js",
                "~/Assets/js/jquery-ui-1.9.0.min.js",
                "~/Assets/js/jquery.layout-latest.js",
                "~/Assets/js/lodash.compat.js",
                "~/Assets/js/bootstrap.min.js",
                "~/Assets/js/infobox.js");

            BundleTable.Bundles.Add(jsBundle);

            var ngBundle = new ScriptBundle("~/Assets/ng-libs");
            ngBundle.Include(
                "~/Assets/js/angular/angular.min.js",
                "~/Assets/js/angular/event.js",
                "~/Assets/js/angular/angular-ui-router.min.js");

            BundleTable.Bundles.Add(ngBundle);

            var appBundle = new ScriptBundle("~/Assets/app");
            appBundle.Include(
                "~/App/app.config.js",
                "~/App/app.main.js"
                );
            appBundle.IncludeDirectory("~/App", "*.js", true);
            BundleTable.Bundles.Add(appBundle);


            var cssBundle = new StyleBundle("~/Assets/css/styles");
            cssBundle.Include(
                "~/Assets/css/bootstrap.css",
                "~/Assets/css/layout-default-latest.css",
                "~/Assets/css/app.css"
                );
            BundleTable.Bundles.Add(cssBundle);
        }
    }
}