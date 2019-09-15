import React from 'react'
import { Link } from 'react-router-dom'

export default function ({ onSearch }) {

    return <>
        <Link to="/sign">Back</Link>
        <h2>Find your Dog</h2>
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { distance: { value: distance }, breed: { value: breed }, gender: { value: gender }, size: { value: size }, age: { value: age }, neutered: { value: neutered }, withDogs: { value: withDogs }, withCats: { value: withCats }, withChildren: { value: withChildren } } } = event

            onSearch(Number(distance), breed, gender, size, Number(age), neutered, withDogs, withCats, withChildren)
        }}>

            <label htmlFor="distance">Distance</label>
            <select name="distance">
                <option value="0"> I don't mind</option>
                <option value="10000"> Up to 10km</option>
                <option value="50000"> Up to 50km</option>
                <option value="100000"> Up to 100km</option>
                <option value="200000"> Up to 200km</option>
                <option value="500000"> Up to 500km</option>
            </select>

            <label htmlFor="breed">Breed</label>
            <select name="breed">
                <option value="other"> other / mix</option>
                <option value="developer"> developer</option>
                <option value="Blue Lacy"> Blue Lacy</option>
                <option value="Queensland Heeler"> Queensland Heeler</option>
                <option value="Rhod Ridgeback"> Rhod Ridgeback</option>
                <option value="Retriever"> Retriever</option>
                <option value="Chinese Sharpei"> Chinese Sharpei</option>
                <option value="Black Mouth Cur"> Black Mouth Cur</option>
                <option value="Catahoula"> Catahoula</option>
                <option value="Staffordshire"> Staffordshire</option>
                <option value="Affenpinscher"> Affenpinscher</option>
                <option value="Afghan Hound"> Afghan Hound</option>
                <option value="Airedale Terrier"> Airedale Terrier</option>
                <option value="Akita"> Akita</option>
                <option value="Australian Kelpie"> Australian Kelpie</option>
                <option value="Alaskan Malamute"> Alaskan Malamute</option>
                <option value="English Bulldog"> English Bulldog</option>
                <option value="American Bulldog"> American Bulldog</option>
                <option value="American English Coonhound"> American English Coonhound</option>
                <option value="American Eskimo Dog (Miniature)"> American Eskimo Dog (Miniature)</option>
                <option value="American Eskimo Dog (Standard)"> American Eskimo Dog (Standard)</option>
                <option value="American Eskimo Dog (Toy)"> American Eskimo Dog (Toy)</option>
                <option value="American Foxhound"> American Foxhound</option>
                <option value="American Hairless Terrier"> American Hairless Terrier</option>
                <option value="American Staffordshire Terrier"> American Staffordshire Terrier</option>
                <option value="American Water Spaniel"> American Water Spaniel</option>
                <option value="Anatolian Shepherd Dog"> Anatolian Shepherd Dog</option>
                <option value="Australian Cattle Dog"> Australian Cattle Dog</option>
                <option value="Australian Shepherd"> Australian Shepherd</option>
                <option value="Australian Terrier"> Australian Terrier</option>
                <option value="Basenji"> Basenji</option>
                <option value="Basset Hound"> Basset Hound</option>
                <option value="Beagle"> Beagle</option>
                <option value="Bearded Collie"> Bearded Collie</option>
                <option value="Beauceron"> Beauceron</option>
                <option value="Bedlington Terrier"> Bedlington Terrier</option>
                <option value="Belgian Malinois"> Belgian Malinois</option>
                <option value="Belgian Sheepdog"> Belgian Sheepdog</option>
                <option value="Belgian Tervuren"> Belgian Tervuren</option>
                <option value="Bergamasco"> Bergamasco</option>
                <option value="Berger Picard"> Berger Picard</option>
                <option value="Bernese Mountain Dog"> Bernese Mountain Dog</option>
                <option value="Bichon Fris_"> Bichon Fris_</option>
                <option value="Black and Tan Coonhound"> Black and Tan Coonhound</option>
                <option value="Black Russian Terrier"> Black Russian Terrier</option>
                <option value="Bloodhound"> Bloodhound</option>
                <option value="Bluetick Coonhound"> Bluetick Coonhound</option>
                <option value="Boerboel"> Boerboel</option>
                <option value="Border Collie"> Border Collie</option>
                <option value="Border Terrier"> Border Terrier</option>
                <option value="Borzoi"> Borzoi</option>
                <option value="Boston Terrier"> Boston Terrier</option>
                <option value="Bouvier des Flandres"> Bouvier des Flandres</option>
                <option value="Boxer"> Boxer</option>
                <option value="Boykin Spaniel"> Boykin Spaniel</option>
                <option value="Briard"> Briard</option>
                <option value="Brittany"> Brittany</option>
                <option value="Brussels Griffon"> Brussels Griffon</option>
                <option value="Bull Terrier"> Bull Terrier</option>
                <option value="Bull Terrier (Miniature)"> Bull Terrier (Miniature)</option>
                <option value="Bulldog"> Bulldog</option>
                <option value="Bullmastiff"> Bullmastiff</option>
                <option value="Cairn Terrier"> Cairn Terrier</option>
                <option value="Canaan Dog"> Canaan Dog</option>
                <option value="Cane Corso"> Cane Corso</option>
                <option value="Cardigan Welsh Corgi"> Cardigan Welsh Corgi</option>
                <option value="Cavalier King Charles Spaniel"> Cavalier King Charles Spaniel</option>
                <option value="Cesky Terrier"> Cesky Terrier</option>
                <option value="Chesapeake Bay Retriever"> Chesapeake Bay Retriever</option>
                <option value="Chihuahua"> Chihuahua</option>
                <option value="Chinese Crested Dog"> Chinese Crested Dog</option>
                <option value="Chinese Shar Pei"> Chinese Shar Pei</option>
                <option value="Chinook"> Chinook</option>
                <option value="Chow Chow"> Chow Chow</option>
                <option value="Cirneco dellEtna"> Cirneco dellEtna</option>
                <option value="Clumber Spaniel"> Clumber Spaniel</option>
                <option value="Cocker Spaniel"> Cocker Spaniel</option>
                <option value="Collie"> Collie</option>
                <option value="Coton de Tulear"> Coton de Tulear</option>
                <option value="Curly-Coated Retriever"> Curly-Coated Retriever</option>
                <option value="Dachshund"> Dachshund</option>
                <option value="Dalmatian"> Dalmatian</option>
                <option value="Dandie Dinmont Terrier"> Dandie Dinmont Terrier</option>
                <option value="Doberman Pinsch"> Doberman Pinsch</option>
                <option value="Doberman Pinscher"> Doberman Pinscher</option>
                <option value="Dogue De Bordeaux"> Dogue De Bordeaux</option>
                <option value="English Cocker Spaniel"> English Cocker Spaniel</option>
                <option value="English Foxhound"> English Foxhound</option>
                <option value="English Setter"> English Setter</option>
                <option value="English Springer Spaniel"> English Springer Spaniel</option>
                <option value="English Toy Spaniel"> English Toy Spaniel</option>
                <option value="Entlebucher Mountain Dog"> Entlebucher Mountain Dog</option>
                <option value="Field Spaniel"> Field Spaniel</option>
                <option value="Finnish Lapphund"> Finnish Lapphund</option>
                <option value="Finnish Spitz"> Finnish Spitz</option>
                <option value="Flat-Coated Retriever"> Flat-Coated Retriever</option>
                <option value="French Bulldog"> French Bulldog</option>
                <option value="German Pinscher"> German Pinscher</option>
                <option value="German Shepherd"> German Shepherd</option>
                <option value="German Shorthaired Pointer"> German Shorthaired Pointer</option>
                <option value="German Wirehaired Pointer"> German Wirehaired Pointer</option>
                <option value="Giant Schnauzer"> Giant Schnauzer</option>
                <option value="Glen of Imaal Terrier"> Glen of Imaal Terrier</option>
                <option value="Golden Retriever"> Golden Retriever</option>
                <option value="Gordon Setter"> Gordon Setter</option>
                <option value="Great Dane"> Great Dane</option>
                <option value="Great Pyrenees"> Great Pyrenees</option>
                <option value="Greater Swiss Mountain Dog"> Greater Swiss Mountain Dog</option>
                <option value="Greyhound"> Greyhound</option>
                <option value="Harrier"> Harrier</option>
                <option value="Havanese"> Havanese</option>
                <option value="Ibizan Hound"> Ibizan Hound</option>
                <option value="Icelandic Sheepdog"> Icelandic Sheepdog</option>
                <option value="Irish Red and White Setter"> Irish Red and White Setter</option>
                <option value="Irish Setter"> Irish Setter</option>
                <option value="Irish Terrier"> Irish Terrier</option>
                <option value="Irish Water Spaniel"> Irish Water Spaniel</option>
                <option value="Irish Wolfhound"> Irish Wolfhound</option>
                <option value="Italian Greyhound"> Italian Greyhound</option>
                <option value="Japanese Chin"> Japanese Chin</option>
                <option value="Keeshond"> Keeshond</option>
                <option value="Kerry Blue Terrier"> Kerry Blue Terrier</option>
                <option value="Komondor"> Komondor</option>
                <option value="Kuvasz"> Kuvasz</option>
                <option value="Labrador Retriever"> Labrador Retriever</option>
                <option value="Lagotto Romagnolo"> Lagotto Romagnolo</option>
                <option value="Lakeland Terrier"> Lakeland Terrier</option>
                <option value="Leonberger"> Leonberger</option>
                <option value="Lhasa Apso"> Lhasa Apso</option>
                <option value="L_wchen"> L_wchen</option>
                <option value="Maltese"> Maltese</option>
                <option value="Manchester Terrier"> Manchester Terrier</option>
                <option value="Mastiff"> Mastiff</option>
                <option value="Miniature American Shepherd"> Miniature American Shepherd</option>
                <option value="Miniature Bull Terrier"> Miniature Bull Terrier</option>
                <option value="Miniature Pinscher"> Miniature Pinscher</option>
                <option value="Miniature Schnauzer"> Miniature Schnauzer</option>
                <option value="Neapolitan Mastiff"> Neapolitan Mastiff</option>
                <option value="Newfoundland"> Newfoundland</option>
                <option value="Norfolk Terrier"> Norfolk Terrier</option>
                <option value="Norwegian Buhund"> Norwegian Buhund</option>
                <option value="Norwegian Elkhound"> Norwegian Elkhound</option>
                <option value="Norwegian Lundehund"> Norwegian Lundehund</option>
                <option value="Norwich Terrier"> Norwich Terrier</option>
                <option value="Nova Scotia Duck Tolling Retriever"> Nova Scotia Duck Tolling Retriever</option>
                <option value="Old English Sheepdog"> Old English Sheepdog</option>
                <option value="other"> other</option>
                <option value="Otterhound"> Otterhound</option>
                <option value="Papillon"> Papillon</option>
                <option value="Parson Russell Terrier"> Parson Russell Terrier</option>
                <option value="Pekingese"> Pekingese</option>
                <option value="Pembroke Welsh Corgi"> Pembroke Welsh Corgi</option>
                <option value="Petit Basset Griffon Vend_en"> Petit Basset Griffon Vend_en</option>
                <option value="Pharaoh Hound"> Pharaoh Hound</option>
                <option value="Plott"> Plott</option>
                <option value="Pointer"> Pointer</option>
                <option value="Polish Lowland Sheepdog"> Polish Lowland Sheepdog</option>
                <option value="Pomeranian"> Pomeranian</option>
                <option value="Standard Poodle"> Standard Poodle</option>
                <option value="Miniature Poodle"> Miniature Poodle</option>
                <option value="Toy Poodle"> Toy Poodle</option>
                <option value="Portuguese Podengo Pequeno"> Portuguese Podengo Pequeno</option>
                <option value="Portuguese Water Dog"> Portuguese Water Dog</option>
                <option value="Pug"> Pug</option>
                <option value="Puli"> Puli</option>
                <option value="Pyrenean Shepherd"> Pyrenean Shepherd</option>
                <option value="Rat Terrier"> Rat Terrier</option>
                <option value="Redbone Coonhound"> Redbone Coonhound</option>
                <option value="Rhodesian Ridgeback"> Rhodesian Ridgeback</option>
                <option value="Rottweiler"> Rottweiler</option>
                <option value="Russell Terrier"> Russell Terrier</option>
                <option value="St. Bernard"> St. Bernard</option>
                <option value="Saluki"> Saluki</option>
                <option value="Samoyed"> Samoyed</option>
                <option value="Schipperke"> Schipperke</option>
                <option value="Scottish Deerhound"> Scottish Deerhound</option>
                <option value="Scottish Terrier"> Scottish Terrier</option>
                <option value="Sealyham Terrier"> Sealyham Terrier</option>
                <option value="Shetland Sheepdog"> Shetland Sheepdog</option>
                <option value="Shiba Inu"> Shiba Inu</option>
                <option value="Shih Tzu"> Shih Tzu</option>
                <option value="Siberian Husky"> Siberian Husky</option>
                <option value="Silky Terrier"> Silky Terrier</option>
                <option value="Skye Terrier"> Skye Terrier</option>
                <option value="Sloughi"> Sloughi</option>
                <option value="Smooth Fox Terrier"> Smooth Fox Terrier</option>
                <option value="Soft-Coated Wheaten Terrier"> Soft-Coated Wheaten Terrier</option>
                <option value="Spanish Water Dog"> Spanish Water Dog</option>
                <option value="Spinone Italiano"> Spinone Italiano</option>
                <option value="Staffordshire Bull Terrier"> Staffordshire Bull Terrier</option>
                <option value="Standard Schnauzer"> Standard Schnauzer</option>
                <option value="Sussex Spaniel"> Sussex Spaniel</option>
                <option value="Swedish Vallhund"> Swedish Vallhund</option>
                <option value="Tibetan Mastiff"> Tibetan Mastiff</option>
                <option value="Tibetan Spaniel"> Tibetan Spaniel</option>
                <option value="Tibetan Terrier"> Tibetan Terrier</option>
                <option value="Toy Fox Terrier"> Toy Fox Terrier</option>
                <option value="Treeing Walker Coonhound"> Treeing Walker Coonhound</option>
                <option value="Vizsla"> Vizsla</option>
                <option value="Weimaraner"> Weimaraner</option>
                <option value="Welsh Springer Spaniel"> Welsh Springer Spaniel</option>
                <option value="Welsh Terrier"> Welsh Terrier</option>
                <option value="West Highland White Terrier"> West Highland White Terrier</option>
                <option value="Whippet"> Whippet</option>
                <option value="Wire Fox Terrier"> Wire Fox Terrier</option>
                <option value="Wirehaired Pointing Griffon"> Wirehaired Pointing Griffon</option>
                <option value="Wirehaired Vizsla"> Wirehaired Vizsla</option>
                <option value="Xoloitzcuintli"> Xoloitzcuintli</option>
                <option value="Yorkshire Terrier"> Yorkshire Terrier</option>
            </select>

            <label htmlFor="gender">Gender</label>
            <select name="gender">
                <option value="true"> Male</option>
                <option value="false"> Female</option>
            </select>

            <label htmlFor="size">Size</label>
            <select name="size">
                <option value="small"> Small</option>
                <option value="medium"> Medium</option>
                <option value="large"> Large</option>
                <option value="xl"> XL</option>
            </select>

            <label htmlFor="age">Age</label>
            <select name="age">
                <option value="0"> I don't mind</option>
                <option value="1"> Puppy</option>
                <option value="2"> Less than a year</option>
                <option value="3"> From 1 to 5 years</option>
                <option value="4"> From 5 to 10 years</option>
                <option value="5"> Senior</option>
            </select>

            <label htmlFor="neutered">Neutered</label>
            <select name="neutered">
                <option value="true" defaultValue> Yes</option>
                <option value="false"> No</option>
            </select>

            <label htmlFor="withDogs">Good with dogs</label>
            <select name="withDogs">
                <option value="true" defaultValue> Yes</option>
                <option value="false"> No / Not tested</option>
            </select>

            <label htmlFor="withCats">Good with cats</label>
            <select name="withCats">
                <option value="true" defaultValue> Yes</option>
                <option value="false"> No / Not tested</option>
            </select>

            <label htmlFor="withChildren">Good with children</label>
            <select name="withChildren">
                <option value="true" defaultValue> Yes</option>
                <option value="false"> No / Not tested</option>
            </select>

            <button>FETCH!</button>
        </form>
    </>
}