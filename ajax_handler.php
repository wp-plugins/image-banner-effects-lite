<?php

defined( 'ABSPATH' ) || die( 'No direct script access allowed!' );

class W3ExIBEffectsAjaxHandler{
	
	public static function handleNewImage($data)
	{
		global $wpdb;
		$table_name = W3ExImageBannerMain::$table_name;
		$size = getimagesize($data['img']);
		if(is_array($size))
		{
			$data['width'] = $size[0];
			$data['height'] = $size[1];
		}
        $args=array(
	        'info'    =>json_encode($data),
	        'type'    => 0//,
      	);
      	$wpdb->insert($table_name,$args);
		$data['id'] = $wpdb->insert_id;
		$infoto = "width: ".$data['width']."  height: ".$data['height']."  ";
		$infoto.="<br/>layers: 0<br/>layer states: 0";
		$data['infoto'] = $infoto;
		$data['shortcode'] = '[ibeffects id="'.$data['id'].'"]';
		$wpdb->update( 
			$table_name, 
			array( 
				'info' => json_encode($data)
			), 
			array( 'ID' => $data['id'] )
			);
		return $data;
	}
	
	public static function handleNewElement($data)
	{
		global $wpdb;
		$table_name = W3ExImageBannerMain::$table_name;
        $args=array(
	        'info'    =>json_encode($data),
	        'type'    => 2//,
      	);
      	$wpdb->insert($table_name,$args);
		$data['id'] = $wpdb->insert_id;
		$infoto= "layer states: 0";
		$data['infoto'] = $infoto;
		$data['shortcode'] = '[ibeffects id="'.$data['id'].'"]';
		$wpdb->update( 
			$table_name, 
			array( 
				'info' => json_encode($data)
			), 
			array( 'ID' => $data['id'] )
			);
		return $data;
	}
	
	public static function handleDeleteImage($data)
	{
		global $wpdb;
		$table_name = W3ExImageBannerMain::$table_name;
		$wpdb->delete( $table_name, array( 'id' => $data['id'] ) );
	}
	
	public static function handleSaveChanges($data)
	{
		global $wpdb;
		$table_name = W3ExImageBannerMain::$table_name;
		$oldinfo = $wpdb->get_row( "SELECT * FROM $table_name WHERE type=0 AND id=".$data['id'] );
		if(!empty($oldinfo))
		{
			$poldinfo = json_decode($oldinfo->info);
			$infoto = "width: ".$poldinfo->width."  height: ".$poldinfo->height."  ";
			$infoto.="<br/>layers: ".$data['layercount']."<br/>layer states: ".$data['statecount'];
			$poldinfo->infoto = $infoto;
			$wpdb->update( 
				$table_name, 
				array( 
					'text' => json_encode($data['layers']),
					'info' => json_encode($poldinfo)
				), 
				array( 'ID' => $data['id'] )
			);
		}else
		{
			$wpdb->update( 
				$table_name, 
				array( 
					'text' => json_encode($data['layers'])
				), 
				array( 'ID' => $data['id'] )
			);
		}
	}
	
	public static function handleSaveElementChanges($data)
	{
		global $wpdb;
		$table_name = W3ExImageBannerMain::$table_name;
		$oldinfo = $wpdb->get_row( "SELECT * FROM $table_name WHERE type=2 AND id=".$data['id'] );
		if(!empty($oldinfo))
		{
			$poldinfo = json_decode($oldinfo->info);
			$infoto = "layer states: ".$data['statecount'];
			$poldinfo->infoto = $infoto;
			$wpdb->update( 
				$table_name, 
				array( 
					'text' => json_encode($data['layers']),
					'info' => json_encode($poldinfo)
				), 
				array( 'ID' => $data['id'] )
			);
		}else
		{
			$wpdb->update( 
				$table_name, 
				array( 
					'text' => json_encode($data['layers'])
				), 
				array( 'ID' => $data['id'] )
			);
		}
	}
	
	public static function handleUpdateElement($data)
	{
		global $wpdb;
		$table_name = W3ExImageBannerMain::$table_name;
		$oldinfo = $wpdb->get_row( "SELECT * FROM $table_name WHERE type=2 AND id=".$data['id'] );
		if(!empty($oldinfo))
		{
			$infoto = json_decode($oldinfo->info);
			$data['infoto'] = $infoto->infoto;
			$data['shortcode'] = $infoto->shortcode;
			$wpdb->update( 
				$table_name, 
				array( 
					'info' => json_encode($data)
				), 
				array( 'ID' => $data['id'] )
			);
		}
	}

	public static function handleSaveStyle($data)
	{
		global $wpdb;
		$table_name = W3ExImageBannerMain::$table_name;
		$styles = $wpdb->get_row( "SELECT * FROM $table_name WHERE type=1" );
		if(empty($styles))
		{
			$args=array(
		        'text'    =>json_encode($data['styles']),
		        'type'    => 1
      		);
      		$wpdb->insert($table_name,$args);
		}else{
			$wpdb->update( 
				$table_name, 
				array( 
					'text' => json_encode($data['styles'])
				), 
				array( 'type' => 1 )
			);
		}
	}
	
	
    public static function ajax()
    {
		$nonce = $_POST['nonce'];
		if(!wp_verify_nonce( $nonce, 'w3ex-ibeffects-nonce' ) )
			die ();
		// get the submitted parameters
		$type = $_POST['type'];
		$data = $_POST['data'];
		$response = '';
		$layerid = 0;
		$arr = array(
		  'success'=>'yes',
		  'id' => $layerid
		);
		switch($type){
			case 'newimage':
			{
				$arr['id'] = self::handleNewImage($data);
			}break;
			case 'newelement':
			{
				$arr['id'] = self::handleNewElement($data);
			}break;
			case 'deleteimage':
			{
				self::handleDeleteImage($data);
			}break;
			case 'savechanges':
			{
				self::handleSaveChanges($data);
			}break;
			case 'saveelementchanges':
			{
				self::handleSaveElementChanges($data);
			}break;
			case 'updateelement':
			{
				self::handleUpdateElement($data);
			}break;
			case 'savestyle':
			{
				self::handleSaveStyle($data);
			}break;
			default:
				break;
		}
		echo json_encode($arr);
    }
}

W3ExIBEffectsAjaxHandler::ajax();
