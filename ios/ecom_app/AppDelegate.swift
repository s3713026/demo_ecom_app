import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import mParticle_Apple_SDK

@main
class AppDelegate: RCTAppDelegate {
  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    self.moduleName = "ecom_app"
    self.dependencyProvider = RCTAppDependencyProvider()

    // You can add your custom initial props in the dictionary below.
    // They will be passed down to the ViewController used by React Native.
    self.initialProps = [:]
    
    // Override point for customization after application launch.
            let mParticleOptions = MParticleOptions(key: "au1-69729659b887d946a96e498e71578f99", secret: "j_j1qHe0e6yiptN6g5mNgEDU0GFNey0WL99fuPf0xEafWzVAkccQaxqdzDewtPca")
            mParticleOptions.environment = MPEnvironment.development
            mParticleOptions.logLevel = MPILogLevel.verbose
//            mParticleOptions.dataPlanId = "mobile_data_plan" // Always undercase with white space replaced with '_'
//            mParticleOptions.dataPlanVersion = 1

    
           /* Optional - Please see the Identity page for more information on building this object
            let request = MPIdentityApiRequest()
            request.email = "email@example.com"
            mParticleOptions.identifyRequest = request
            mParticleOptions.onIdentifyComplete = { (apiResult, error) in
                NSLog("Identify complete. userId = %@ error = %@", apiResult?.user.userId.stringValue ?? "Null User ID", error?.localizedDescription ?? "No Error Available")
            }
            //Optional
            mParticleOptions.onAttributionComplete = { (attributionResult, error) in
                NSLog(@"Attribution Complete. attributionResults = %@", attributionResult.linkInfo)
            */
           //Start the SDK
            MParticle.sharedInstance().start(with: mParticleOptions)

    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
