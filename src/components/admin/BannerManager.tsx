
import React from 'react';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import BannerForm from './banner/BannerForm';
import BannerList from './banner/BannerList';
import { useBannerManager } from './banner/useBannerManager';

const BannerManager = () => {
  const { 
    banners,
    setBanners,
    loading,
    submitting,
    setSubmitting,
    isEditing,
    limitReached,
    formData,
    setFormData,
    fetchBanners,
    resetForm,
    handleEdit
  } = useBannerManager();

  if (loading && banners.length === 0) {
    return <div className="flex justify-center p-8"><div className="w-8 h-8 border-2 border-food-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="space-y-6">
      {limitReached && !isEditing && (
        <Alert className="bg-amber-50 border-amber-200">
          <AlertDescription>
            Maximum banner limit (5) reached. Delete an existing banner before adding a new one.
          </AlertDescription>
        </Alert>
      )}
      
      <Card className="p-6">
        <BannerForm 
          formData={formData}
          setFormData={setFormData}
          banners={banners}
          isEditing={isEditing}
          resetForm={resetForm}
          fetchBanners={fetchBanners}
          submitting={submitting}
          setSubmitting={setSubmitting}
          limitReached={limitReached}
        />
      </Card>
      
      <Card>
        <div className="p-4">
          <h2 className="text-xl font-semibold">Banner Images</h2>
          <p className="text-gray-500 text-sm">Manage banner images for your homepage ({banners.length}/5)</p>
        </div>
        
        <Separator />
        
        <div className="overflow-x-auto">
          <BannerList 
            banners={banners}
            setBanners={setBanners}
            onEdit={handleEdit}
            fetchBanners={fetchBanners}
          />
        </div>
      </Card>
    </div>
  );
};

export default BannerManager;
