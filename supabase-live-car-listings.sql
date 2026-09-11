-- Moses Benz Auto Care — live external Mercedes-Benz listing preview migration
begin;
alter table public.inventory add column if not exists listing_url text not null default '';
alter table public.inventory add column if not exists listing_source text not null default '';
alter table public.inventory add column if not exists condition text not null default '';
alter table public.inventory add column if not exists fuel text not null default '';
alter table public.inventory add column if not exists transmission text not null default '';
alter table public.inventory add column if not exists body text not null default '';
alter table public.inventory add column if not exists drivetrain text not null default '';
alter table public.inventory add column if not exists engine_size text not null default '';
alter table public.inventory add column if not exists cylinders text not null default '';
alter table public.inventory add column if not exists horsepower text not null default '';
alter table public.inventory add column if not exists color text not null default '';
alter table public.inventory add column if not exists interior_color text not null default '';
alter table public.inventory add column if not exists seats text not null default '';
alter table public.inventory add column if not exists registered text not null default '';
-- The existing demo inventory is deactivated, not deleted. You can re-enable/delete it later from the admin portal.
update public.inventory set active=false where active=true;
insert into public.inventory(id,name,brand,year,price_ngn,mileage_km,spec_tag,status,image_url,description,listing_url,listing_source,condition,fuel,transmission,body,drivetrain,engine_size,cylinders,horsepower,color,interior_color,seats,registered,active) values
('jiji-glc-2017-black','Mercedes-Benz GLC 300 4MATIC','Mercedes-Benz',2017,32000000,70000,'2.0L Turbo · 4MATIC','available','https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes%20Benz%20GLC%20250%204Matic%202017%20%2852241371196%29.jpg','Foreign-used 2017 GLC 300 4MATIC, automatic, black, listed in Lagos. Listing details include 70,000 km and no-fault condition.','https://jiji.ng/ajah/cars/mercedes-benz-glc-class-2017-black-5tFZkcEsvbcquinzWzNssWjB.html','Jiji Nigeria','Foreign Used','Petrol','Automatic','SUV','4WD / 4MATIC','2000 cc','4','','Black','','','No',true),
('jiji-gle-400-2018-black-imesco','Mercedes-Benz GLE 400 4MATIC','Mercedes-Benz',2018,55000000,0,'3.0L V6 · 4MATIC','available','https://pictures-nigeria.jijistatic.net/188967811_NjIwLTQ2NS0wY2Y0MTUyMGIz.webp','Foreign-used 2018 GLE 400 4MATIC listing from Lagos. The listing describes full options, reverse camera, panoramic features, duty paid and navigation.','https://jiji.ng/apapa/cars/mercedes-benz-gle-class-gle-400-4matic-2018-black-aZjqBfVkGnzbGOAdZlji5S7Q.html','Jiji Nigeria','Foreign Used','Petrol','Automatic','SUV','AWD / 4MATIC','3000 cc','6','328 hp','Black','Other','5','No',true),
('jiji-gle-400-2018-black-apostles','Mercedes-Benz GLE 400 4MATIC','Mercedes-Benz',2018,45700000,86881,'3.0L V6 · 4MATIC','available','https://pictures-nigeria.jijistatic.net/197719966_MTExLTgzLWVmOTNhYWM2NmE.webp','Foreign-used 2018 GLE 400 4MATIC listing from Lagos with 86,881 km. Listing states clean title, no accident and full options.','https://jiji.ng/apapa/cars/mercedes-benz-gle-class-gle-400-4matic-2018-black-7x9UXvHwhUPiTu6siGxFy4D4.html','Jiji Nigeria','Foreign Used','Petrol','Automatic','SUV','AWD / 4MATIC','3000 cc','6','328 hp','Black','Black','5','No',true)
on conflict (id) do update set name=excluded.name,year=excluded.year,price_ngn=excluded.price_ngn,mileage_km=excluded.mileage_km,spec_tag=excluded.spec_tag,status=excluded.status,image_url=excluded.image_url,description=excluded.description,listing_url=excluded.listing_url,listing_source=excluded.listing_source,condition=excluded.condition,fuel=excluded.fuel,transmission=excluded.transmission,body=excluded.body,drivetrain=excluded.drivetrain,engine_size=excluded.engine_size,cylinders=excluded.cylinders,horsepower=excluded.horsepower,color=excluded.color,interior_color=excluded.interior_color,seats=excluded.seats,registered=excluded.registered,active=true;
commit;
