import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a new Product',
        href: '/products/create',
    },
];

export default function create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/products');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a new product" />
            <div className="w-6/12 p-4">
                <form className="space-y-3" onSubmit={handleSubmit}>
                    <div className="">
                        <Label htmlFor="product name">Name</Label>
                        <Input
                            placeholder="Product name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && (
                            <div className="text-xs text-red-600">
                                {errors.name}
                            </div>
                        )}
                    </div>
                    <div className="">
                        <Label htmlFor="product price">Price</Label>
                        <Input
                            placeholder="Product price"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                        />
                        {errors.price && (
                            <div className="text-xs text-red-600">
                                {errors.price}
                            </div>
                        )}
                    </div>
                    <div className="">
                        <Label htmlFor="product description">Description</Label>
                        <Textarea
                            placeholder="Product description"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                        />
                    </div>
                    <Button type="submit">Add Product</Button>
                </form>
            </div>
        </AppLayout>
    );
}
