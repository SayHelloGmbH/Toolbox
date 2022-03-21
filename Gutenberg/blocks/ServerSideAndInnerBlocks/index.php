<?php

namespace SayHello\Theme\Block;

use WP_Block;

/**
 * Guest Author list/grid
 * Text and button are rendered using InnerBlocks
 * Other content is rendered server-side.
 *
 * @author Say Hello GmbH <hello@sayhello.ch>
 */
class GuestAuthors
{

	public function run()
	{
		add_action('init', [$this, 'register']);
	}

	/**
	 * Registers the block for server-side rendering
	 */
	public function register()
	{
		register_block_type('sht/guest-authors', [
			'attributes' => [
				'title' => [
					'type'  => 'string',
				],
			],
			'render_callback' => function (array $attributes, string $content, WP_Block $block) {

				$classNameBase = wp_get_block_default_classname($block->name);

				$users = get_users([
					'meta_key' => 'is_guest_author',
					'meta_value' => 1,
					'order_by' => 'name'
				]);

				$user_list = [];

				foreach ($users as $user) {
					$user_list[] = '<li class="' . $classNameBase . '__entry">' . $user->display_name . '</li>';
				}

				ob_start();
?>
			<div <?php echo get_block_wrapper_attributes(); ?>>

				<?php
				// Output the title if there is one
				$title = esc_html($attributes['title'] ?? '');
				if (!empty($title)) {
				?>
					<h2 class="<?php echo $classNameBase; ?>__title"><?php echo $title; ?></h2>
				<?php
				}

				// Output the list of users: 100% server-side generated
				if (!empty($users)) {
				?>
					<ul class="<?php echo $classNameBase; ?>__entries"><?php echo implode(chr(10), $user_list); ?></ul>
				<?php
				}

				// Output the editor-generated content
				echo $content;
				?>
			</div>
<?php
				$html = ob_get_contents();
				ob_end_clean();
				return $html;
			}
		]);
	}
}
