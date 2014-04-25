<?php

defined( 'ABSPATH' ) || die( 'No direct script access allowed!' );

class W3ExIBEffectsMainAdminView{
	
	private static $ins = null;
    public static function init()
    {
       self::instance()->_main();
    }

    public static function instance()
    {
        is_null(self::$ins) && self::$ins = new self;
        return self::$ins;
    }
	public function showMainPage()
	{
		global $wpdb;
		$table_name = W3ExImageBannerMain::$table_name;
		 ?>
		<div class="wrap">
		<!--<div id="w3exibaparent">-->
		<h2>Images</h2>
		<br/>
		<table id="showimages" class="widefat" >
		<thead>
		 <tr>
		 	<th style="width: 10%">ID</th>
			<th style="width: 20%">shortcode</th>
			<th style="width: 30%">info</th>
			<th style="width: 40%">image</th>
		 </tr>
		 </thead>
		 <tbody>
		<?php
			$rows = $wpdb->get_results( "SELECT * FROM $table_name WHERE (type=0 OR type=2) ORDER BY id ASC" );
			if(!empty($rows))
			{
				 for($i = 0; $i< count($rows); $i++)
				 {
				 	$row = $rows[$i];
					echo '<tr>';
					$data = json_decode($row->info);
					$type = json_decode($row->type);
					echo '<td>'.$row->id.'</td>';
					if(property_exists($data,'shortcode'))
						echo '<td>'.$data->shortcode.'</td>';
					else 
						echo '<td> </td>';
					if(property_exists($data,'infoto'))
						echo '<td><div style="text-align:left;">'.$data->infoto.'</div></td>';
					else 
						echo '<td> </td>';
					
					echo '<td style="padding-top:2px;padding-bottom:6px;"><div class="centerblock">';
					echo '<div class="imagebuttons">
							<a class="btn btn-success btn-sm editlayer" href="admin.php?page=ibeffects&edit='.$row->id.'">
							<span class="glyphicon glyphicon-pencil"></span>
							Edit</a>';
					if($type == 2)
					{
						echo "<script>
						 var W3Ex = W3Ex || {};
						 W3Ex.containers = W3Ex.containers || [];
						 var newcontainer = {};";
						echo "newcontainer.id = ".$row->id.";";
							if($data->standalone == "true")
							{
								echo "newcontainer.standalone = 'true';";
								echo "newcontainer.attached = 'false';";
							}else
							{
								echo "newcontainer.standalone = 'false';";
								echo "newcontainer.attached = 'true';";
								echo "newcontainer.elemid = '".$data->elemid."';";
								echo "newcontainer.elemposition = '".$data->elemposition."';";
								echo "newcontainer.ifoffset = '".$data->ifoffset."';";
								if(property_exists($data,'leftrightp'))
									echo "newcontainer.leftrightp = '".$data->leftrightp."';";
								if(property_exists($data,'leftrightd'))
									echo "newcontainer.leftrightd = '".$data->leftrightd."';";
								if(property_exists($data,'topbottomp'))
									echo "newcontainer.topbottomp = '".$data->topbottomp."';";
								if(property_exists($data,'topbottomd'))
									echo "newcontainer.topbottomd = '".$data->topbottomd."';";
							}
						echo "W3Ex.containers.push(newcontainer);</script>";
						echo	'<button data-id="'.$row->id.'" class="btn btn-info btn-sm layersettings" style="margin-top:6px;margin-bottom:6px;"><span class="glyphicon glyphicon-cog"></span>
								&nbsp;Settings</button>';
					}else
						echo '<br/><br /><br />';
					echo '<button data-id="'.$row->id.'" class="btn btn-danger btn-sm deletelayer">
			 					<span class="glyphicon glyphicon-trash"></span>
							Delete</button></div>';
					if($row->type == 0)
					{
						echo '<div class="shownimages"><img src="'.$data->thumb.'"/></div><div style="clear:both;"> </div></div></td></tr>';
					}
					else
					{
						$eleminfo = '<br>type: placeholder';
						if($data->standalone == "true")
						{
							
							$eleminfo.= '<br>sub-type: standalone';
						}else
						{
							$eleminfo = 'type: placeholder';
							$eleminfo.= '<br>sub-type: attached';
							$eleminfo.= '<br>to element: '.$data->elemid;
							$eleminfo.= '<br>position: '.$data->elemposition;
						}
						echo '<div class="shownimages" style="text-align:left;padding-left:40px;">'.$eleminfo.'</div><div style="clear:both;"> </div></div></td></tr>';
					}
				 }
			}
		?>
		</tbody>
		</table><br/><br/><button id="newimage" class="btn btn-primary btn-sm">
		 <span class="glyphicon glyphicon-plus"></span>
		New Image</button>&nbsp;&nbsp;&nbsp;&nbsp;
		<button id="newplaceholder" class="btn btn-primary btn-sm">
		 <span class="glyphicon glyphicon-plus"></span>
		New Placeholder</button>&nbsp;/no image, single layer/
		<div id="placeholder">
		<input id="p0" type="radio" name="radiop" />
		<label for="p0">Standalone /layer appears at the shortcode position/</label>
		<br/><br/>
		<input id="p1" type="radio" name="radiop" />
		<label for="p1">Attach to element /ID/</label> <br /><br />
			<div style="padding:22px;" >
			Element ID: <input id="aelementid" type="text"/><br /><br />
			<div style="display:inline-block;">Select layer placement:&nbsp;</div><div id="elementplacement" style="width:80px;display:inline-block;">asdasd&nbsp;</div><div style="display:inline-block;"><input id="applyoffset" type="checkbox"><label for="applyoffset">Apply offset to position</label></div><br /> <br />
			<div class="btn-group btn-group-sm">
			  <button id="Top-left" type="button" class="btn btn-default btn-sm">Top L</button>
			  <button id="Top-middle" type="button" class="btn btn-default btn-sm">Top M</button>
			  <button id="Top-right" type="button" class="btn btn-default btn-sm">Top R</button>
			  <div id="leftrightdiv"><input id="leftrightper" type="text" value="0" style="width:40px;margin-left:60px;">%<input id="leftrightleft" type="radio" name="leftright" style="margin-left:10px;" checked="checked"><label for="leftrightleft">Left</label>
			  <input id="leftrightright" type="radio" name="leftright" style="margin-left:8px;"><label for="leftrightright">Right</label></div>
			</div>
			<div style="margin-top: 5px;">
			  <button id="Mid-left" type="button" class="btn btn-default btn-sm">Mid L&nbsp;</button>
			  <button id="Mid-middle" type="button" class="btn btn-default btn-sm">Center</button>
			  <button id="Mid-right" type="button" class="btn btn-default btn-sm">Mid R&nbsp;</button>
			  <div id="topbottomdiv"><input id="topbottomper" type="text" value="0" style="width:40px;margin-left:60px;">%<input id="topbottomtop" type="radio" name="topbottom" style="margin-left:10px;" checked="checked"><label for="topbottomtop">Top</label>
			  <input id="topbottombottom" type="radio" name="topbottom" style="margin-left:8px;"><label for="topbottombottom">Bottom</label></div>
			</div>
			<div style="margin-top: 5px;">
			  <button id="Bot-left" type="button" class="btn btn-default btn-sm">Bot L&nbsp;</button>
			  <button id="Bot-middle" type="button" class="btn btn-default btn-sm">Bot M</button>
			  <button id="Bot-right" type="button" class="btn btn-default btn-sm">Bot R&nbsp;</button>
			</div>
			</div>
		  <div id="elementerror"></div>
		</div>
		<div id="newimagediv" class="ui-widget-content ui-corner-all ui-accordion-content-active ui-accordion-content" >
		<div id="imagedivback"></div>
		<div id="imagesizes">
		
		</div>
		<br style="clear: both;" />
			<div style="margin-left: 10%;">
				<button id="imagesaveok" class="btn btn-success btn-sm">
				 <span class="glyphicon glyphicon-ok"></span>
					OK</button>
				<button id="imagesavecancel" class="btn btn-warning btn-sm">
				 <span class="glyphicon glyphicon-remove"></span>
				Cancel</button>
			</div>
		</div>
		<br />
		</div>
		<?php
	}
	
	public function showEditPage($row,$styles)
	{
		 $rowinfo = json_decode($row->info);
		 $type = json_decode($row->type);
		 echo '<script>
		 	var W3Ex = W3Ex || {};
			W3Ex.imageid = '.$row->id.';';
			if(!empty($row->text))
				echo 'W3Ex.imagearrlayers = '.$row->text.';';
			if(!empty($styles->text))
				echo 'W3Ex.arrstyles = '.$styles->text.';';
			if($type ==2)
				echo 'W3Ex.iselement = true';
			echo '</script>';
		 ?>
		
		<div id="editorcontainer">
			<br /><br /><br />
			 <?php
				 $settings = array( 'textarea_name' => 'post_text' ,'wpautop' => false,'tinymce' => array('forced_root_block' => false,'convert_newlines_to_brs' => true));
				 wp_editor("", "editorid",$settings );
			 ?>
			<textarea style="display:none;width: 300px;" name="post_text" id="editorid" rows="3"></textarea>
			<br />
			<button id="htmleditorok" class="btn btn-success btn-sm">
				 <span class="glyphicon glyphicon-ok"></span>
					OK</button>
				<button id="htmleditorcancel" class="btn btn-warning btn-sm">
				 <span class="glyphicon glyphicon-remove"></span>
				Cancel</button>
			</div>
		<div class="wrap w3exvtfscope">
		<h2>Edit <?php if($type == 0) echo 'Image'; ?></h2>
		<br/>
		<?php
			if($type == 2)
			{
				echo '<div id="w3_ibacontainer0" class="w3c_wrap_element w3_ibacontainer" style="width:500px;height:300px;">
						<div class="defaultlayer_element layer imagelayer defaultstyle selected" data-id="0">
					     Layer
					    <br>
						</div>
					  </div>';
			}else
			{
				echo '<div id="w3_ibacontainer0" class="w3c_wrap w3_ibacontainer">
					  <img src="'.$rowinfo->img.'" id="mainimage" />
					  </div>';
			}
		?>
		<br/><br/>
		   <div style="width:485px;">
			<button id="newlayer" class="btn btn-primary btn-sm">
			 <span class="glyphicon glyphicon-plus"></span>
			New Layer</button>
			<button id="previewlayer" class="btn btn-success btn-sm" type="button">
			<span class="glyphicon glyphicon-play"></span>
			Preview Layer</button>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<button id="deletelayer" class="btn btn-danger btn-sm" type="button">
			<span class="glyphicon glyphicon-trash"></span>
			Delete Layer</button>
			</div>
			<br/><br/>
			<div id="maindiv">
				<div id="states" style="float:left;width:485px;">
					<div style="display: inline-block;">
					<div style="width:485px;" class="centered ui-accordion ui-widget " role="tablist">
						<div class="ui-accordion-header ui-state-default ui-accordion-header-active ui-state-active ui-corner-top">
						Layer States
						</div>
						
						<div class="ui-accordion-content ui-widget-content ui-corner-bottom ui-accordion-content-active" style="display: block;">
						<ul id="statescontainer" class="connectedSortable">
							
						</ul>
						<br>
							New: 
							<button id="newtextstate" class="btn btn-primary btn-sm" type="button">
							<span class="glyphicon glyphicon-font"></span>
							Text</button>
							<button id="newhtmlstate" class="btn btn-primary btn-sm" type="button">
							<span class="glyphicon glyphicon-globe"></span>
							Html</button>
							<button id="newimagestate" class="btn btn-primary btn-sm" type="button">
							<span class="glyphicon glyphicon-picture"></span>
							Image</button>
						</div>
					</div>
					</div>
				<div id="statesettings">
					<ul>
					<li><a href="#statesettings-1">Settings</a></li>
					<li><a href="#statesettings-2">Animation</a></li>
					</ul>
					<div id="statesettings-1">
					<p>
						<table>
							<tr>
								<td>
									<div id="contenttype">Text</div>
								</td>
								<td>
									<div id="statecontainerdiv" style="position:relative;">
									<div id="statecontentdiv">
									
									</div>
									<textarea id="statecontent" class="ui-nobackground ui-widget ui-state-default ui-corner-all"></textarea>
									<button id="editcontent" class="btn btn-primary btn-sm" type="button">Edit Content</button>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									Style
								</td>
								<td>
									<div id="displaystyle">
										<button id="changestyle" class="btn btn-primary btn-sm" type="button">Change Style</button>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									Display state for
								</td>
								<td>
									<input id="displaystate" value="4000" class="ui-widget ui-state-default ui-corner-all" />
									 ms
								</td>
							</tr>
							<tr><td colspan="2" style="height:1px;padding:0px;">&nbsp;</td></tr>
							<tr>
								<td>
									Delay before start<br/>
									/first state only/
								</td>
								<td>
									<input id="delaystate" value="0" class="ui-widget ui-state-default ui-corner-all"/>
									 ms
								</td>
							</tr>
							<tr><td colspan="2" style="height:1px;padding:0px;">&nbsp;</td></tr>
							<tr>
								<td>
									After finished<br/>
									/Last state only/
								</td>
								<td>
								
							<!--	<div id="laststate" class="ui-widget ui-state-default ui-corner-all">-->
									
								<select id="laststatefin" class="ui-widget ui-state-default ui-corner-all">
								  <option value="loop">Loop to first state</option>
								  <option value="stopstatic">Stop and apply static animation</option>
								  <option value="stop">Stop</option>
								  </select>
								<!--</div>-->
								</td>
								
							</tr>
						</table>
					</p>
					</div>
					<div id="statesettings-2">
					<p>
						<table>
							<tr>
								<td>
									On Appear
								</td>
								<td>
								<select id="onappeartype" class="ui-widget ui-state-default ui-corner-all">
								  <option value="fadein">Fade In</option>
								  <option value="hflip">Horizontal Flip</option>
								  <option value="vflip">Vertical Flip</option>
								  <option value="mixed">Mixed Appear</option>
								  <option value="top">From Top</option>
								  <option value="left">From Left</option>
								  <option value="right">From Right</option>
								  <option value="bottom">From Bottom</option>
								</select>
								Easing <select id="onappeareasing" class="ui-widget ui-state-default ui-corner-all">
								  <option value="ease">Ease</option>
								  <option value="snap">Snap</option>
								  <option value="linear">Linear</option>
								  
								</select>
								Speed <input id="onappearspeed" value="500" class="ui-widget ui-state-default ui-corner-all" />
									 ms
								</td>
							</tr>
							<tr><td colspan="3" style="height:1px;padding:0px;">&nbsp;</td></tr>
							<tr>
								<td>
									On Disappear
								</td>
								<td>
								<select id="ondisappeartype" class="ui-widget ui-state-default ui-corner-all">
								  <option value="none">None</option>
								  <option value="fadeout">Fade Out</option>
								  <option value="hflip">Horizontal Flip</option>
								  <option value="vflip">Vertical Flip</option>
								  <option value="mixed">Mixed Disapp</option>
								  <option value="top">To Top</option>
								  <option value="left">To Left</option>
								  <option value="right">To Right</option>
								  <option value="bottom">To Bottom</option>
								</select>
								Easing <select id="ondisappeareasing" class="ui-widget ui-state-default ui-corner-all">
								  <option value="ease">Ease</option>
								  <option value="snap">Snap</option>
								  <option value="linear">Linear</option>
								</select>
								Speed <input id="ondisappearspeed" value="500" class="ui-widget ui-state-default ui-corner-all" />
									 ms
								</td>
							</tr>
							<tr><td colspan="3" style="height:1px;padding:0px;">&nbsp;</td></tr>
							<tr>
								<td>
									Static Effect<br/>
									/Last state only/
								</td>
								<td>
								  <select id="laststateeffect" class="ui-widget ui-state-default ui-corner-all">
								      <option value="tada">Tada</option>
								      <option value="rubber">Rubber band</option>
									  <option value="shake">Shake</option>
									  <option value="swing">Swing</option>
									  <option value="bounce">Bounce</option>
									  <option value="flash">Flash</option>
									  <option value="pulse">Pulse</option>
									  <option value="wobble">Wobble</option>
								  </select>
								</td>
								
							</tr>
						</table>
					</p>
					</div>
				</div>
			</div>
			<div style="clear: both"></div>
			<br><br>
			<button id="savechanges" class="btn btn-success btn-sm" type="button">
			<span class="glyphicon glyphicon-floppy-disk"></span>
			Save Changes</button>&nbsp;&nbsp;
			<a id="backtoimages" class="btn btn-success btn-sm" href="admin.php?page=ibeffects">
							<span class="glyphicon glyphicon-circle-arrow-left"></span>
							Back to Images</a>
			<div id="showdialog">
			<div style="width:100%;text-align: center;margin:40px 0px;"><div id="fontexample">Example</div></div>
			 <div style="float:left;margin-top:60px;margin-left:20px;">
				<p>
				<label for="font-size">Font size:</label>
				<input type="text" id="font-size" readonly>
				</p>
				<div id="slider-font-size"></div>
				<p>
				<br/>
				Font color: <input type="text" id="font-color" > <input type="text" id="font-color-value" readonly>
				</p>
				<p>
				<br/>
				Font family: <input type="text" id="font-family" >
				<br/>
				</p>
				 <input class="jqButton" type="checkbox" id="ifbackground"><label for="ifbackground"> Set non-transparent background</label>
				 <div id="divifbackground">
				<p>
				
				<input type="text" id="back-color" > <input type="text" id="back-color-value" readonly>
				</p>
				<p>
				<label>Border radius size:</label>
				<input type="text" id="radius-size" readonly>
				</p>
				<div id="slider-radius-size"></div>
				<p>
				<label>Padding /distance to border/:</label>
				<input type="text" id="padding-size" readonly>
				</p>
				<div id="slider-padding-size"></div>
				</div>
			 </div>
			 <div class="ui-accordion-content ui-widget-content ui-corner-all ui-accordion-content-active" id="stylediv">
			 	
				<table>
					<tr>
					<td>
					Use style
					</td>
					<td>
					 <select id="usestyles" class="ui-widget ui-state-default ui-corner-all">
								  <option value="none"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
					</select>
					</td>
					</tr>
					<tr>
					<td>
					Save settings to:
					</td>
					<td>
					<div style="margin-bottom:10px;">
					<button id="updatestyle" class="btn btn-primary btn-xs" type="button">
							Selected style</button>
					</div>
							<button id="newstyle" class="btn btn-primary btn-xs" type="button">
							New style</button>
							<input id="newstylename" value="" class="ui-widget ui-state-default ui-corner-all">
					</td>
					</tr>
					<tr>
					<td>
					Selected style:
					</td>
					<td>
					<div style="margin-bottom:10px;">
					<button id="renamestyle" class="btn btn-success btn-xs" type="button">
							Rename</button>
							<input id="renamestylename" value="" class="ui-widget ui-state-default ui-corner-all">
					</div>
							
					<button id="deletestyle" class="btn btn-danger btn-xs" type="button">
					<span class="glyphicon glyphicon-trash"></span>
							Delete</button>
							
					</td>
					</tr>
				</table>
			 </div>
			</div>
			<div id="showimagesizes" style="width:100%;text-align: center;margin:40px 0px;">
			 <div id="showimagesizesinner" style="text-align:left;">
			 </div>
			</div>
		</div>
		
		<?php
	}
	
    public function _main()
    {
		
		global $wpdb;
		$table_name = W3ExImageBannerMain::$table_name;
		$action = $_SERVER["QUERY_STRING"];
		if(isset($_GET['edit']))
		{
			$imageid = $_GET['edit'];
			if(is_numeric($imageid ))
			{
				$row = $wpdb->get_row( "SELECT * FROM $table_name WHERE id=$imageid AND (type=0 OR type=2)" );
				if(!empty($row))
				{
					$styles = $wpdb->get_row( "SELECT * FROM $table_name WHERE type=1" );
					$this->showEditPage($row,$styles);
					return;
				}
			}
		}
		$this->showMainPage();
    }
}

W3ExIBEffectsMainAdminView::init();
