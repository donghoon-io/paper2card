
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/data" | "/generate" | "/tutorial";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/data": Record<string, never>;
			"/generate": Record<string, never>;
			"/tutorial": Record<string, never>
		};
		Pathname(): "/" | "/data" | "/data/" | "/generate" | "/generate/" | "/tutorial" | "/tutorial/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/authors/donghoon.jpg" | "/authors/gary.jpg" | "/authors/lucy.jpg" | "/branding/google.svg" | "/branding/hcde.svg" | "/branding/ischool.svg" | "/branding/microsoft.svg" | "/branding/uw.svg" | "/demo/0.jpg" | "/demo/1.jpg" | "/favicon.png" | "/og.jpg" | "/papers/1.svg" | "/papers/2.svg" | "/papers/3.svg" | "/papers/4.svg" | "/papers/5.svg" | "/papers/6.svg" | "/papers/7.svg" | "/pdf/1.pdf" | "/pdf/10.pdf" | "/pdf/2.pdf" | "/pdf/3.pdf" | "/pdf/4.pdf" | "/pdf/5.pdf" | "/pdf/6.pdf" | "/pdf/7.pdf" | "/pdf/8.pdf" | "/pdf/9.pdf" | "/preloaded_images/1.png" | "/preloaded_images/10.png" | "/preloaded_images/2.png" | "/preloaded_images/3.png" | "/preloaded_images/4.png" | "/preloaded_images/5.png" | "/preloaded_images/6.png" | "/preloaded_images/7.png" | "/preloaded_images/8.png" | "/preloaded_images/9.png" | "/robots.txt" | "/smui.css" | "/study/1.pdf" | "/study/1.png" | "/study/2.pdf" | "/study/2.png" | "/study/3.pdf" | "/study/3.png" | "/study/4.pdf" | "/study/4.png" | "/study.zip" | "/tutorial/1.png" | "/tutorial/2.png" | "/tutorial/3.png" | "/tutorial/4.png" | string & {};
	}
}