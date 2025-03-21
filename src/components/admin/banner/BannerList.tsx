
import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Pencil, Trash2, Image, Eye, MoveUp, MoveDown } from 'lucide-react';

interface BannerImage {
  id: string;
  image_url: string;
  title: string | null;
  description: string | null;
  active: boolean;
  slide_order: number;
}

interface BannerListProps {
  banners: BannerImage[];
  setBanners: React.Dispatch<React.SetStateAction<BannerImage[]>>;
  onEdit: (banner: BannerImage) => void;
  fetchBanners: () => Promise<void>;
}

const BannerList: React.FC<BannerListProps> = ({ banners, setBanners, onEdit, fetchBanners }) => {
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this banner image?')) return;
    
    try {
      const { error } = await supabase
        .from('banner_images')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setBanners(banners.filter(banner => banner.id !== id));
      
      toast({
        title: "Banner deleted",
        description: "The banner image has been removed",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting banner",
        description: error.message || "Could not delete the banner",
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      const { error } = await supabase
        .from('banner_images')
        .update({ active: !currentActive })
        .eq('id', id);
      
      if (error) throw error;
      
      setBanners(banners.map(banner => 
        banner.id === id ? { ...banner, active: !currentActive } : banner
      ));
      
      toast({
        title: currentActive ? "Banner deactivated" : "Banner activated",
        description: currentActive 
          ? "The banner image is now hidden from the site" 
          : "The banner image is now visible on the site",
      });
    } catch (error: any) {
      toast({
        title: "Error updating banner",
        description: error.message || "Could not update the banner status",
        variant: "destructive",
      });
    }
  };

  const handleMoveUp = async (banner: BannerImage, index: number) => {
    if (index <= 0) return;
    
    const prevBanner = banners[index - 1];
    const prevOrder = prevBanner.slide_order;
    const currentOrder = banner.slide_order;
    
    try {
      // Update the current banner with the previous banner's order
      await supabase
        .from('banner_images')
        .update({ slide_order: prevOrder })
        .eq('id', banner.id);
      
      // Update the previous banner with the current banner's order
      await supabase
        .from('banner_images')
        .update({ slide_order: currentOrder })
        .eq('id', prevBanner.id);
      
      // Update state
      const updatedBanners = [...banners];
      [updatedBanners[index - 1], updatedBanners[index]] = [updatedBanners[index], updatedBanners[index - 1]];
      setBanners(updatedBanners);
      
      toast({
        title: "Order updated",
        description: "Banner slide order has been updated",
      });
    } catch (error: any) {
      toast({
        title: "Error updating order",
        description: error.message || "Could not update the banner order",
        variant: "destructive",
      });
    }
  };

  const handleMoveDown = async (banner: BannerImage, index: number) => {
    if (index >= banners.length - 1) return;
    
    const nextBanner = banners[index + 1];
    const nextOrder = nextBanner.slide_order;
    const currentOrder = banner.slide_order;
    
    try {
      // Update the current banner with the next banner's order
      await supabase
        .from('banner_images')
        .update({ slide_order: nextOrder })
        .eq('id', banner.id);
      
      // Update the next banner with the current banner's order
      await supabase
        .from('banner_images')
        .update({ slide_order: currentOrder })
        .eq('id', nextBanner.id);
      
      // Update state
      const updatedBanners = [...banners];
      [updatedBanners[index], updatedBanners[index + 1]] = [updatedBanners[index + 1], updatedBanners[index]];
      setBanners(updatedBanners);
      
      toast({
        title: "Order updated",
        description: "Banner slide order has been updated",
      });
    } catch (error: any) {
      toast({
        title: "Error updating order",
        description: error.message || "Could not update the banner order",
        variant: "destructive",
      });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">Preview</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Order</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {banners.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-gray-500">
              No banner images found. Add your first banner using the form above.
            </TableCell>
          </TableRow>
        ) : (
          banners.map((banner, index) => (
            <TableRow key={banner.id}>
              <TableCell>
                {banner.image_url ? (
                  <div className="w-16 h-12 rounded overflow-hidden">
                    <img 
                      src={banner.image_url} 
                      alt={banner.title || 'Banner'} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-12 rounded bg-gray-100 flex items-center justify-center">
                    <Image className="w-5 h-5 text-gray-400" />
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium">{banner.title || 'Untitled Banner'}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${banner.active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span>{banner.active ? 'Active' : 'Inactive'}</span>
                </div>
              </TableCell>
              <TableCell>{banner.slide_order}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={index === 0}
                    onClick={() => handleMoveUp(banner, index)}
                  >
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={index === banners.length - 1}
                    onClick={() => handleMoveDown(banner, index)}
                  >
                    <MoveDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={banner.active ? 'text-orange-500' : 'text-green-500'}
                    onClick={() => handleToggleActive(banner.id, banner.active)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(banner)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDelete(banner.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default BannerList;
