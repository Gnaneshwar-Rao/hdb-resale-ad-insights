import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getListingById } from '@/lib/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Building, MapPin, Square, DollarSign, CalendarDays } from 'lucide-react';
import { UpdateIntent } from '@/components/update-intent';
import { Separator } from '@/components/ui/separator';

export default async function ListingPage({ params }: { params: { id: string } }) {
  const listing = await getListingById(params.id);

  if (!listing) {
    notFound();
  }

  const image = PlaceHolderImages.find(img => img.id === 'apartment-building') || { 
    imageUrl: 'https://picsum.photos/seed/123/1200/800', 
    imageHint: 'apartment building' 
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <UpdateIntent town={listing.town} />
      <Card className="overflow-hidden shadow-lg animate-fade-in">
        <div className="grid md:grid-cols-2">
          <div className="relative h-64 md:h-full min-h-[300px] bg-muted">
            <Image
              src={image.imageUrl}
              alt={listing.street_name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              data-ai-hint={image.imageHint}
              priority
            />
          </div>
          <div className="flex flex-col">
            <CardHeader className="p-6">
              <CardTitle className="font-headline text-3xl md:text-4xl">{listing.street_name}, Blk {listing.block}</CardTitle>
              <CardDescription className="text-base">
                A lovely {listing.flat_type.toLowerCase()} flat in the heart of {listing.town}.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6 flex-1">
                <div className="flex items-center gap-3 text-muted-foreground bg-secondary/50 p-4 rounded-lg">
                  <DollarSign className="h-6 w-6 text-primary" />
                  <span className="text-3xl font-bold text-foreground">${listing.resale_price.toLocaleString()}</span>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-x-4 gap-y-6 text-sm">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                        <p className="text-muted-foreground">Town</p>
                        <p className="font-semibold">{listing.town}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-primary" />
                    <div>
                        <p className="text-muted-foreground">Flat Type</p>
                        <p className="font-semibold">{listing.flat_type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Square className="h-5 w-5 text-primary" />
                     <div>
                        <p className="text-muted-foreground">Floor Area</p>
                        <p className="font-semibold">{listing.floor_area_sqm} sqm</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    <div>
                        <p className="text-muted-foreground">Sale Month</p>
                        <p className="font-semibold">{new Date(listing.month).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                    </div>
                  </div>
                </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
