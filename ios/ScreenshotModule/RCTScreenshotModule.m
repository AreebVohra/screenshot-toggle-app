
#import "RCTScreenshotModule.h"

@implementation RCTScreenshotModule {
    UITextField *secureField;
}

RCT_EXPORT_MODULE();
- (NSArray<NSString *> *)supportedEvents {
    return @[@"userDidTakeScreenshot"];
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

#pragma mark - Lifecycle


-(void) addSecureTextFieldToView:(UIView *) view {
    UIView *rootView = [UIApplication sharedApplication].keyWindow.rootViewController.view;
    // fixes safe-area
    secureField = [[UITextField alloc] initWithFrame:rootView.frame];
    secureField.secureTextEntry = TRUE;
    secureField.userInteractionEnabled = FALSE;

    [view sendSubviewToBack:secureField];
    [view addSubview:secureField];
    [view.layer.superlayer addSublayer:secureField.layer];
    [[secureField.layer.sublayers objectAtIndex:0] addSublayer:view.layer];
}

-(void) removeSecureTextFieldFromView:(UIView *) view {
    for(UITextField *subview in view.subviews){
        if([subview isMemberOfClass:[UITextField class]]) {
            if(subview.secureTextEntry == TRUE) {
                [subview removeFromSuperview];
                subview.secureTextEntry = FALSE;
                secureField.userInteractionEnabled = TRUE;
            }
        }
    }
}

#pragma mark - Public API

RCT_EXPORT_METHOD(preventScreenshots){
    if(secureField.secureTextEntry == false) {
        UIView *view = [UIApplication sharedApplication].keyWindow.rootViewController.view;
        for(UIView *subview in view.subviews) {
            [self addSecureTextFieldToView:subview];
        }
    }
}

RCT_EXPORT_METHOD(allowScreenshots) {
    secureField.secureTextEntry = false;
    UIView *view = [UIApplication sharedApplication].keyWindow.rootViewController.view;
    for(UIView *subview in view.subviews) {
        [self removeSecureTextFieldFromView:subview];
    }
}

@end
