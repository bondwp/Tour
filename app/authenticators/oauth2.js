import Ember from 'ember';
import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import Config from 'tourme-partner/config/environment';

export default OAuth2PasswordGrant.extend({
	authenticate(identification, password, type) { //, scope = []
		return new Ember.RSVP.Promise((resolve, reject) => {
			if ( type == "email" ) {
				ajaxRequestA2sLoginEmail(Config.urlLogin, identification, password).then(function(a2sLogin){
					if ( !Ember.isNone(a2sLogin.user.email) && !Ember.isNone(a2sLogin.user._id) ) {
						//En función de la respuesta resolveremos para autenticar la sesión
						//a la sessión le hace falta un token para quedar autenticada y que al refrescar la página siga estando logueado
						//si no viene ponemos uno inventado o generamos uno aleatorio ya que no lo queremos para nada más
						let accessToken = Ember.isNone(a2sLogin.accessToken) ? "123456" : a2sLogin.accessToken;
						var resp = {access_token:accessToken, userId: a2sLogin.user._id, email:a2sLogin.user.email.login};
						if (a2sLogin.user.complete.backoffice){
							if ( !Ember.isNone(a2sLogin.user.name) ) {
								resp['name'] = a2sLogin.user.name;
							}
							if ( !Ember.isNone(a2sLogin.user.firstName) ) {
								resp['firstName'] = a2sLogin.user.firstName;
							}
							if ( !Ember.isNone(a2sLogin.user.pic) ) {
								resp['picture'] = a2sLogin.user.pic;
							}
							if ( !Ember.isNone(a2sLogin.user.backInfo.profile) ) {
								resp['profile'] = a2sLogin.user.backInfo.profile;
							}							
							resolve(resp);
						}else{
							reject({responseJSON:{message:"User not Authorized!"}})
						}
					}
				}).catch(reject);
			} 
			// else {
			// 	//TODO unificar 2 funciones
			// 	ajaxRequestA2sLoginUsername(Config.urlLogin, identification, password).then(function(a2sLogin){
			// 		if ( !Ember.isNone(a2sLogin.user.email) && !Ember.isNone(a2sLogin.user._id) ) {
			// 			//En función de la respuesta resolveremos para autenticar la sesión
			// 			//a la sessión le hace falta un token para quedar autenticada y que al refrescar la página siga estando logueado
			// 			//si no viene ponemos uno inventado o generamos uno aleatorio ya que no lo queremos para nada más
			// 			let accessToken = Ember.isNone(a2sLogin.accessToken) ? "123456" : a2sLogin.accessToken;
			// 			var resp = {access_token:accessToken, userId: a2sLogin.user._id};
			// 			if ( !Ember.isNone(a2sLogin.user.name) ) {
			// 				resp['name'] = a2sLogin.user.name;
			// 			}
			// 			if ( !Ember.isNone(a2sLogin.user.firstName) ) {
			// 				resp['firstName'] = a2sLogin.user.firstName;
			// 			}
			// 			if ( !Ember.isNone(a2sLogin.user.pic) ) {
			// 				resp['picture'] = a2sLogin.user.pic;
			// 			}
			// 			resolve(resp);
			// 		}
			// 	}).catch(reject);
			// }

		});
	},
});
