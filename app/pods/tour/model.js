import DS from 'ember-data';

export default DS.Model.extend({
  tourIcon :DS.attr('string'),
  country  :DS.attr('string'),
  uDate    :DS.attr('date'),
  flags    :DS.attr(), //Llega un array
  pic      :DS.attr('string'), 
  name     :DS.attr('string'), 
  status   :DS.attr('string'), //aproved y demás
  uid      :DS.attr('string'),
  shortDesc:DS.attr('string'),
  longDesc :DS.attr('string')
});
