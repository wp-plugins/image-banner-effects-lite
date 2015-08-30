<?php   
/* 
Plugin Name: Image Banner Effects Lite
Plugin URI: http://www.w3examples.com/wordpress/image_banner_effects.php
Description: Create banner effects for your images
Author: George Iron
Version: 1.2 
Author URI: http://www.w3examples.com
*/ 
 
defined( 'ABSPATH' ) || die( 'No direct script access allowed!' );

class W3ExImageBannerMain {
	
	private static $ins = null;
	private static $idCounter = 0;
	public static $table_name = "";
    public static function init()
    {
		global $wpdb;
		self::$table_name = $wpdb->prefix .'ibeffects_layers';
        add_action('admin_menu', array(self::instance(), '_setup'));
		add_action('wp_enqueue_scripts', array(self::instance(),'load_frontend_scripts') );
//		add_filter('image_size_names_choose', array(self::instance(), 'showsizes'), 11, 1);
		add_shortcode('ibeffects',array(__CLASS__,'generate_shortcode')); //array(self::instance(),'generate_shortcode'));
		
		register_activation_hook( __FILE__, array(__CLASS__,'activating_plugin' ));
		add_action('wp_ajax_ibeffects_ajax_request',  array(__CLASS__, 'ajax_request'));
    }

    public static function instance()
    {
        is_null(self::$ins) && self::$ins = new self;
        return self::$ins;
    }

    public function _setup()
    {
       $page = add_menu_page("Image Effects","Image Effects","manage_options","ibeffects",array(self::instance(), 'showpage'));  
//	    add_submenu_page("ibeffects","dsdsdsd","sdsdsdsd","manage_options","ibeffects1",array(self::instance(), 'showpage1'));  
	   add_action( 'admin_enqueue_scripts', array(self::instance(), 'admin_scripts') );
    }
	
	public function showpage1()
    {
        require_once(dirname(__FILE__).'/ibeffects.php');
    }
	
	public static function ajax_request()
	{
		require_once(dirname(__FILE__).'/ajax_handler.php');
		// IMPORTANT: don't forget to "exit"
		die();
	}
	
	function showsizes( $sizes ) {
	     
	    $new_sizes = array();
	     
	    $added_sizes = get_intermediate_image_sizes();
	     
	    // $added_sizes is an indexed array, therefore need to convert it
	    // to associative array, using $value for $key and $value
	    foreach( $added_sizes as $key => $value) {
	        $new_sizes[$value] = $value;
	    }
	     
	    // This preserves the labels in $sizes, and merges the two arrays
	    $new_sizes = array_merge( $new_sizes, $sizes );
	     
	    return $new_sizes;
	}
	
    function admin_scripts($hook)
	{
		$ibegin = strpos($hook,'page_ibeffects',0);
	 	if( $ibegin === FALSE)
			return;
		wp_enqueue_script('jquery-ui-dialog');
		wp_enqueue_script('jquery-ui-accordion');
		wp_enqueue_script('jquery-ui-tabs');
		wp_enqueue_script('jquery-ui-sortable');
		wp_enqueue_script('jquery-ui-draggable');
		wp_enqueue_script('jquery-ui-slider');
		if(function_exists( 'wp_enqueue_media' )){
		    wp_enqueue_media();
		}else{
		    wp_enqueue_style('thickbox');
		    wp_enqueue_script('media-upload');
		    wp_enqueue_script('thickbox');
		}
		$purl = plugin_dir_url(__FILE__);
		wp_enqueue_style('w3exibe-jqueryui',$purl.'css/jquery-ui.css',false, '1.0', 'all' );
		wp_enqueue_style('w3exibe-adminboot',$purl.'css/bootstrap-cust.css',false, '1.0', 'all' );
		wp_enqueue_style('w3exibe-clienteffects',$purl.'css/ibeffects-client.css',false, '1.0', 'all' );
		wp_enqueue_style('w3exibe-admincss',$purl.'css/admin.css',false, '1.0', 'all' );
		wp_enqueue_script('w3exibe_adminjs', $purl . 'js/admin-min.js',  array(), '1.0.0', true );
		wp_enqueue_style('w3exibe-spect',$purl.'css/spectrum.css',false, '1.0', 'all' );
		wp_enqueue_script('w3exibe-jqspect',$purl.'js/spectrum.js', array(), '1.0', true );
		wp_localize_script('w3exibe_adminjs', 'W3ExIBA', array(
			'ajaxurl' => admin_url( 'admin-ajax.php' ),
			'nonce' => wp_create_nonce( 'w3ex-ibeffects-nonce' ),
			)
		);
		
	}
	
	function load_frontend_scripts()
	{
		$purl = plugin_dir_url(__FILE__);
		wp_enqueue_style('w3exibe-clienteffects',$purl.'css/ibeffects-client.css',false, '1.0', 'all' );
		wp_enqueue_script('w3exibe-jseffects', $purl . 'js/clienteffects-min.js', array('jquery'), '1.0.0', true );
	}
	
	public static function generate_shortcode($atts,$content=NULL )
	{
		global $wpdb;
		
		extract( shortcode_atts( array(
			'id' => '',
		), $atts ) );
		$html = '';
		if(is_numeric($id))
		{
			$row = $wpdb->get_row( "SELECT * FROM ".self::$table_name." WHERE id=$id AND (type=0 OR type=2)");
			if(!empty($row))
			{
				$data = json_decode($row->info);
				$type = json_decode($row->type);
				$html.= "<script>
						 var W3Ex = W3Ex || {};
						 W3Ex.containers = W3Ex.containers || [];
						 var newcontainer = {};";
				$html.= "newcontainer.id = ".self::$idCounter.";";
				if($type == 0)
				{
					$html.= "newcontainer.elemid = 'w3_ibacontainer".self::$idCounter."';";
					$html.= "newcontainer.placeholder = false;";
					$html.= "newcontainer.attached = false;";
				}else
				{
					$html.= "newcontainer.placeholder = true;";
					if($data->standalone == "true")
					{
						$html.= "newcontainer.standalone = true;";
						$html.= "newcontainer.attached = false;";
						$html.= "newcontainer.elemid = 'w3_ibacontainer".self::$idCounter."';";
					}else
					{
						$html.= "newcontainer.standalone = false;";
						$html.= "newcontainer.attached = true;";
						$html.= "newcontainer.elemid = '".$data->elemid."';";
						$html.= "newcontainer.elemposition = '".$data->elemposition."';";
						$html.= "newcontainer.ifoffset = '".$data->ifoffset."';";
						$html.= "newcontainer.leftrightp = '".$data->leftrightp."';";
						$html.= "newcontainer.leftrightd = '".$data->leftrightd."';";
						$html.= "newcontainer.topbottomp = '".$data->topbottomp."';";
						$html.= "newcontainer.topbottomd = '".$data->topbottomd."';";
					}
				}
				$html.= "W3Ex.containers.push(newcontainer);";
				$html.= "</script>";
				if($type == 0)
				{
					$html.= '<div id="w3_ibacontainer'.self::$idCounter.'" class="w3_ibacontainer" style="position: relative;overflow: hidden;max-width:'.$data->width.'px;">';
					
					$html.= '<img class="w3ex_ibaimage" data-width="'.$data->width.'" data-height="'.$data->height.'" data-id="'.self::$idCounter.'" src="'.$data->img.'"/>';
				}else
				{
					{
						$html.= '<div id="w3_ibacontainer'.self::$idCounter.'" class="w3c_wrap_element">';
					}
				}
				$layers = json_decode($row->text);
				if(!empty($layers))
				{
				if(property_exists($layers,'layers'))
				{
				if(property_exists($layers->layers,'items'))
				{
				foreach ($layers->layers->items as $item)
				{
					if($type == 0)
					{
						$html.= '<div id="w3_ibalayer'.self::$idCounter.'_'.$item->id.'" class="w3_ibalayer'.self::$idCounter.' w3ibe_layer" style="position: absolute;top:'.$item->top.'px;
						left:'.$item->left.'px;display:inline;" data-id="'.$item->id.'"></div>';
					}else{
						$html.= '<div id="w3_ibalayer'.self::$idCounter.'_'.$item->id.'" class="w3_ibalayer'.self::$idCounter.' w3ibe_layer" style="position: relative;display:inline-block;" data-id="'.$item->id.'"></div>';
					}
				}
				$html.= '<div class="w3_ibainner" style="position:relative;overflow:hidden;">';
				foreach ($layers->states->items as $item)
				{
					if(!property_exists($item,'layerid')) continue;
					$html.= '<div id="w3_ibaeffect'.self::$idCounter.'_'.$item->layerid.'_'.$item->stateid.'" 
					class="w3_ibalayerid'.$item->layerid.'_'.self::$idCounter.' w3_effect"
					data-id="'.$item->stateid.'"
					data-layerid="'.$item->layerid.'"
					data-layerdom="w3_ibalayer'.self::$idCounter.'_'.$item->layerid.'"
					data-sortid="'.$item->sortid.'"
					data-type="'.$item->type.'"
					data-displayfor="'.$item->displayfor.'"
					data-delayfor="'.$item->delayfor.'"
					data-afterfin="'.$item->afterfin.'"
					data-onapp="'.$item->onappear.'"
					data-onappeasing="'.$item->onappeareasing.'"
					data-onappspeed="'.$item->onappearspeed.'"
					data-ondis="'.$item->ondisappear.'"
					data-ondiseasing="'.$item->ondisappeareasing.'"
					data-ondisspeed="'.$item->ondisappearspeed.'"';
					if(property_exists($item,'staticeffect'))
					$html.= ' data-staticeffect="'.$item->staticeffect.'" ';
					$html.= 'style="position: absolute;left:0px;top:0px;display:inline;';
					if(property_exists($item,'style') && !empty($item->style))
					{
						if(property_exists($item->style,'fontsize') && !empty($item->style->fontsize))
						{
							$style = 'font-size:'.$item->style->fontsize.'px;';
							$style.= 'color:'.$item->style->fontcolor.';';
							if(!empty($item->style->fontfamily))
								$style.= 'font-family:'.$item->style->fontfamily.';';
							if(property_exists($item->style,'ifbackground'))
							{
								if($item->style->ifbackground != "false")
								{
									if(property_exists($item->style,'backcolor'))
										$style.= 'background:'.$item->style->backcolor.';';
									if(property_exists($item->style,'radiussize'))
										$style.= 'border-radius:'.$item->style->radiussize.'px;';
									if(property_exists($item->style,'padding'))
									{
										$style.= 'padding:'.$item->style->padding.'px;';
									}
										
								}
							}
							
							$html.= $style;
						}
					}
					$html.='">';
					switch($item->type){
						case "text":{
							$texta =  $item->text;
							$texta = nl2br($texta);
							$texta = str_replace('\\\\','@@@@@',$texta);
							$texta = str_replace('\\','',$texta);
							$texta = str_replace('@@@@@','\\\\',$texta);
							$html.=$texta;
						}
						break;
						case "html":{
							$texta =  $item->html;
							$texta = str_replace('\\"','"',$texta);
							$html.=$texta;
						}
						break;
						case "image":{
							$html.= '<img src="'.$item->imagesrc.'" />';
						}
						break;
						default:
							break;
					}	
					$html.='</div>';
				}
				}}}
				$html.= '</div></div>';
				self::$idCounter++;
				return $html;
			}
		}
		return "";
	}
	public static function activating_plugin()
	{
		global $wpdb;

		$sql = "CREATE TABLE " . self::$table_name ." (
		id mediumint(9) NOT NULL AUTO_INCREMENT,
		text text NOT NULL,
		info text NOT NULL,
		type mediumint(9) NOT NULL,
		PRIMARY KEY (id)
		)ENGINE=MyISAM  DEFAULT CHARSET=utf8;";
		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		//execute the query to create our table
		dbDelta( $sql );
	}
	
	public function showpage()
    {
        require_once(dirname(__FILE__).'/ibeffects.php');
    }
}

W3ExImageBannerMain::init();
