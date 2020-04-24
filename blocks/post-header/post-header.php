<section class="wp-block-sht-post-header has-text-align-<?php echo $data['attributes']['alignment'];?>">
	<div class="wp-block-sht-post-header__inner">
		<header class="wp-block-sht-post-header__header">
			<h1 class="wp-block-sht-post-header__title"><?php the_title();?></h1>
		</header>
		<?php if (!empty($excerpt = get_the_excerpt())) {?>
			<div class="wp-block-sht-post-header__excerpt"><?php echo $excerpt;?></div>
		<?php } elseif (sht_theme()->Package->Gutenberg->isContextEdit()) {?>
			<mark class="wp-block-sht-post-header__excerptempty"><?php _ex('Add an excerpt using the global "Excerpt" field. (Optional.)', 'Helptext', 'sht');?></mark>
		<?php }?>
	</div>
</section>
