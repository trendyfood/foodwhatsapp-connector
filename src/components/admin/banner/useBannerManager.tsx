
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { BannerImage } from './types';

export const useBannerManager = () => {
  const [banners, setBanners] = useState<BannerImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Partial<BannerImage>>({
    image_url: '',
    title: '',
    description: '',
    active: true,
    slide_order: 0
  });

  const fetchBanners = async () => {
    try {
      const { data, error } = await supabase
        .from('banner_images')
        .select('*')
        .order('slide_order', { ascending: true });
      
      if (error) throw error;
      
      setBanners(data || []);
      setLimitReached(data && data.length >= 5);
    } catch (error: any) {
      console.error('Error fetching banners:', error);
      toast({
        title: "Error loading banners",
        description: error.message || "Could not load banner images",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      image_url: '',
      title: '',
      description: '',
      active: true,
      slide_order: banners.length > 0 ? Math.max(...banners.map(banner => banner.slide_order || 0)) + 1 : 0
    });
    setIsEditing(false);
  };

  const handleEdit = (banner: BannerImage) => {
    setFormData(banner);
    setIsEditing(true);
  };

  const deleteAllBannerPolicies = async () => {
    try {
      // First check if there are any banners
      const { data: bannersData, error: bannersError } = await supabase
        .from('banner_images')
        .select('count');
        
      if (bannersError) throw bannersError;
      
      // Delete all banners to reset
      if (bannersData && bannersData.length > 0) {
        const { error: deleteError } = await supabase
          .from('banner_images')
          .delete()
          .gte('id', '0'); // This ensures we delete all rows
          
        if (deleteError) throw deleteError;
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting banners:", error);
      return false;
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return {
    banners,
    setBanners,
    loading,
    submitting,
    setSubmitting,
    isEditing,
    setIsEditing,
    limitReached,
    formData,
    setFormData,
    fetchBanners,
    resetForm,
    handleEdit,
    deleteAllBannerPolicies
  };
};
