<?php

add_action('rest_api_init', [$this, 'restRoutes']);

…

public function restRoute(){
	register_rest_route('shp_gantrisch_outdooractive', 'categories_from_api', [
			'methods'  => WP_REST_Server::READABLE,
			'permission_callback' => function () {
				return true;
			},
			'callback' => function (WP_REST_Request $request) {

				// Get categories into a hierarchical array here.
				// Then parse them. Using id, name and children 
				// allows the returned array to be passed directly
				// to the TreeSelect component in React (Gutenberg)

				foreach ($categories as $category) {
					$entry = [
						'id' => $category['id'],
						'name' => $category['name'],
						'children' => []
					];

					if (!empty($category['category'])) {
						foreach ($category['category'] as $sub_category) {
							$entry['children'][] = [
								'id' => $sub_category['id'],
								'name' => $sub_category['name'],
								'children' => []
							];
						}
					}

					$categories[] = $entry;
					unset($entry);
				}

				return $categories;
			}
		]);
	}
}
