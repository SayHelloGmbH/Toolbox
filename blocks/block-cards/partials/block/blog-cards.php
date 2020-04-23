<?php

use SayHello\Theme\Package\Lazysizes;

if (empty($data['posts'])) {
	return;
}

if (!empty($align = $data['attributes']['align']?? $data['attributes']['align'])) {
	$align = ' align'.$align;
}

?>

<section class="wp-block-sht-blog-cards<?php echo $align;?>">
	<div class="wp-block-sht-blog-cards__inner">
		<header class="wp-block-sht-blog-cards__header">
			<h2 class="wp-block-sht-blog-cards__title"><?php _ex('Latest blog posts', 'News list default title', 'sht');?></h2>
		</header>
		<div class="wp-block-sht-blog-cards__entrieswrap">
			<ul class="wp-block-sht-blog-cards__entries">
				<?php foreach ($data['posts'] as $data_post) {
					if (has_post_thumbnail($data_post)) {
						$thumbnail = '<a class="wp-block-sht-blog-cards__figurelink" href="'.get_the_permalink($data_post->ID).'">'.Lazysizes::getLazyImage(get_post_thumbnail_id($data_post), 'card', 'wp-block-sht-blog-cards__figure', 'wp-block-sht-blog-cards__image').'</a>';
					} elseif (!empty($video_url = get_field('video_ref', $data_post->ID))) {
						$thumbnail = sht_theme()->Package->Media->getVideoThumbnail($video_url);
						if (!empty($thumbnail)) {
							$thumbnail = sprintf(
								'<a class="wp-block-sht-blog-cards__figurelink" href="%s"><figure class="wp-block-sht-blog-cards__figure"><img alt="%s" class="wp-block-sht-blog-cards__image" src="%s"></figure></a>',
								get_the_permalink($data_post->ID),
								get_the_title($data_post->ID),
								$thumbnail
							);
						}
					} else {
						$thumbnail = '<div class="wp-block-sht-blog-cards__figure wp-block-sht-blog-cards__figure--empty"></div>';
					}
					?>
					<li class="wp-block-sht-blog-cards__entry">
						<?php echo $thumbnail; ?>
						<h3 class="wp-block-sht-blog-cards__entrytitle wp-block-sht-blog-cards__entrytitle">
							<a href="<?php the_permalink($data_post->ID);?>"><?php echo get_the_title($data_post->ID);?></a>
						</h3>
						<time class="wp-block-sht-blog-cards__entrydate" datetime="<?php echo get_the_date('c', $data_post->ID); ?>"><?php printf(_x('Published on %s', 'sht'), get_the_date(null, $data_post->ID)); ?></time>
						<?php if (!empty($excerpt = get_the_excerpt($data_post->ID))) {?>
							<div class="wp-block-sht-blog-cards__excerpt">
								<?php echo $excerpt;?>
							</div>
							<?php
						}?>
						<div class="wp-block-sht-blog-cards__readmorewrap"><a class="wp-block-sht-blog-cards__readmore" href="<?php the_permalink($data_post->ID);?>"><?php _ex('Read more', 'Blog card read more text', 'sht');?></a></div>
					</li>
				<?php }?>
			</ul>
		</div>
	</div>
</section>
