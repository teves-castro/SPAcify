
using System;
using System.Web.Optimization;

[assembly: WebActivator.PostApplicationStartMethod(
    typeof(Spacify.SpaConfig), "PreStart")]
namespace Spacify
{
    public static class SpaConfig
    {
        public static void PreStart()
        {
            // Add your start logic here
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}// Generated helper templates
// Generated items
// C:\git\SpaTemplate\SpaTemplate\App_Start\SpaConfig.cs.pp

