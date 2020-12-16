<?php

namespace SayHello\Theme\Store;

use WP_REST_Response;

/**
 * Registers REST API endpoints to get WordPress Menus
 * The registration of the Menus takes place in the Navigation Package.
 *
 * @author Mark Howells-Mead <mark@sayhello.ch>
 */
class Menus
{
	public function run()
	{
		add_action('rest_api_init', [$this, 'endpoints']);
	}

    public function endpoints()
	{
		register_rest_route('sht', '/menus', array(
			'methods' => 'GET',
			'callback' => function(){
                return new WP_REST_Response(get_registered_nav_menus());
			},
		));
	}

}
